import type { ApiConfig, Comment, CommentStore } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'

import { fetchFrontendCommentList } from '@/api/frontend-comment'
import { createLatestGuard } from '@/utils/index'

const usePiniaStore = defineStore('globalCommentStore', () => {
    const commentGuard = createLatestGuard()
    const state: CommentStore = reactive({
        lists: {
            data: [],
            hasNext: 0,
            hasPrev: 0,
            page: 1,
            path: '',
        },
    })

    /**
     * 读取评论列表
     * @param config 请求参数
     */
    const getCommentList = async (config: ApiConfig) => {
        const requestedPage = Number(config.page) || 1
        const requestedPath = config.path || state.lists.path || ''
        if (requestedPage === 1 && requestedPath && requestedPath === state.lists.path) {
            return
        }
        const token = commentGuard.next()
        if (requestedPage === 1) {
            state.lists = {
                data: [],
                hasNext: 0,
                hasPrev: 0,
                page: 1,
                path: '',
            }
        }
        const { code, data } = await fetchFrontendCommentList({ ...config, page: requestedPage })
        if (!commentGuard.isLatest(token)) {
            return
        }
        if (code === 200 && data) {
            const list = data.list ?? []
            const prev = requestedPage === 1 ? [] : state.lists.data
            state.lists = {
                data: requestedPage === 1 ? list : prev.concat(list),
                hasNext: data.hasNext ?? 0,
                hasPrev: data.hasPrev ?? 0,
                page: requestedPage + 1,
                path: requestedPath,
            }
            return
        }
        if (requestedPage === 1) {
            state.lists = {
                data: [],
                hasNext: 0,
                hasPrev: 0,
                page: 1,
                path: requestedPath,
            }
        }
    }
    /**
     * 添加评论成功后, 插入评论
     * @param payload 评论详情
     */
    const insertCommentItem = (payload: Comment) => {
        state.lists.data = [payload].concat(state.lists.data)
    }
    /**
     * 删除评论成功后, 更新评论数据
     * @param id 评论ID
     */
    const deleteComment = (id: string) => {
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
     * 恢复评论成功后, 更新评论数据
     * @param id 评论ID
     */
    const recoverComment = (id: string) => {
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
        getCommentList,
        insertCommentItem,
        deleteComment,
        recoverComment,
    }
})

export default usePiniaStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
