import type { AdminStore, ApiConfig, User } from '~/types'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { fetchBackendAdminItem, fetchBackendAdminList } from '@/api/backend-admin'
import { createLatestGuard, toSingleId } from '@/utils/index'

const usePiniaStore = defineStore('backendAdminStore', () => {
    const itemGuard = createLatestGuard()
    const state: AdminStore = reactive({
        lists: {
            hasNext: 0,
            hasPrev: 0,
            path: '',
            page: 1,
            data: [],
        },
        item: {
            data: null,
            path: '',
        },
    })

    /**
     * 读取管理员列表
     * @param config 请求参数
     */
    const getAdminList = async (config: Pick<ApiConfig, 'page' | 'path'>) => {
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
            return
        }
        const { code, data } = await fetchBackendAdminList({ ...config })
        if (code === 200 && data) {
            const {
                list = [],
                path,
                hasNext = 0,
                hasPrev = 0,
                page,
            } = {
                ...data,
                path: config.path,
                page: config.page,
            }

            state.lists = {
                data: page === 1 ? list : state.lists.data.concat(list),
                hasNext,
                hasPrev,
                page: (page || 1) + 1,
                path,
            }
        }
    }
    /**
     * 读取管理员详情
     * @param config 请求参数
     */
    const getAdminItem = async (config: Pick<ApiConfig, 'id' | 'path'>) => {
        const requestedId = toSingleId(config.id)
        const token = itemGuard.next()
        try {
            const { code, data } = await fetchBackendAdminItem({ ...config, id: requestedId })
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
     * 编辑管理员
     * @param payload 请求参数
     */
    const updateAdminItem = (payload: User) => {
        state.item.data = payload
        const index = state.lists.data.findIndex(ii => ii._id === payload._id)
        if (index > -1) {
            state.lists.data.splice(index, 1, payload)
        }
    }
    /**
     * 删除管理员
     * @param id 管理员ID
     */
    const deleteAdmin = (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            const row = state.lists.data[index]
            if (row) {
                state.lists.data.splice(index, 1, {
                    ...row,
                    is_delete: 1,
                })
            }
        }
    }
    /**
     * 恢复管理员
     * @param id 管理员ID
     */
    const recoverAdmin = (id: string) => {
        const index = state.lists.data.findIndex(ii => ii._id === id)
        if (index > -1) {
            const row = state.lists.data[index]
            if (row) {
                state.lists.data.splice(index, 1, {
                    ...row,
                    is_delete: 0,
                })
            }
        }
    }

    return {
        ...toRefs(state),
        getAdminList,
        getAdminItem,
        updateAdminItem,
        deleteAdmin,
        recoverAdmin,
    }
})

/**
 * 后台管理员Store
 */
export default usePiniaStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
