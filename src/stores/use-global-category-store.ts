import type { ApiConfig, Category, CategoryStore } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'

import { fetchCategoryItem, fetchCategoryList } from '@/api/category'
import { createLatestGuard, toSingleId } from '@/utils/index'

const usePiniaStore = defineStore('globalCategoryStore', () => {
    const itemGuard = createLatestGuard()
    const state: CategoryStore = reactive({
        lists: [],
        item: {
            data: null,
        },
    })

    /**
     * 读取分类列表
     * @param config 请求参数
     */
    const getCategoryList = async (config: ApiConfig) => {
        if (state.lists.length) {
            return
        }
        const { code, data } = await fetchCategoryList({ ...config })
        if (code === 200 && data) {
            state.lists = data.list
        }
    }
    /**
     * 读取分类详情
     * @param config 请求参数
     */
    const getCategoryItem = async (config: ApiConfig) => {
        const requestedId = toSingleId(config.id)
        const token = itemGuard.next()
        try {
            const { code, data } = await fetchCategoryItem({ ...config, id: requestedId })
            if (!itemGuard.isLatest(token)) {
                return
            }
            if (code === 200 && data) {
                state.item = {
                    data,
                    ...config,
                    id: requestedId,
                }
            }
        }
        catch {
            // 过期或失败的详情请求不覆盖当前表单
        }
    }
    /**
     * 添加分类成功后, 插入分类
     * @param payload 分类详情
     */
    const insertCategoryItem = (payload: Category) => {
        state.lists = [payload].concat(state.lists)
    }
    /**
     * 编辑分类成功后, 更新分类数据
     * @param payload 分类详情
     */
    const updateCategoryItem = (payload: Category) => {
        state.item.data = payload
        const index = state.lists.findIndex(ii => ii._id === payload._id)
        if (index > -1) {
            state.lists.splice(index, 1, payload)
        }
    }
    /**
     * 删除分类成功后, 更新分类数据
     * @param id 分类ID
     */
    const deleteCategory = (id: string) => {
        const index = state.lists.findIndex(ii => ii._id === id)
        if (index > -1) {
            const row = state.lists[index]
            if (row) {
                state.lists.splice(index, 1, {
                    ...row,
                    is_delete: 1,
                })
            }
        }
    }
    /**
     * 恢复分类成功后, 更新分类数据
     * @param id 分类ID
     */
    const recoverCategory = (id: string) => {
        const index = state.lists.findIndex(ii => ii._id === id)
        if (index > -1) {
            const row = state.lists[index]
            if (row) {
                state.lists.splice(index, 1, {
                    ...row,
                    is_delete: 0,
                })
            }
        }
    }

    return {
        ...toRefs(state),
        getCategoryList,
        getCategoryItem,
        insertCategoryItem,
        updateCategoryItem,
        deleteCategory,
        recoverCategory,
    }
})

export default usePiniaStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
