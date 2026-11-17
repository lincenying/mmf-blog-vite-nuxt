import type { ApiConfig, Article, FArticleStore, ListStore } from '@/types'
import { acceptHMRUpdate, defineStore } from 'pinia'

import { fetchFrontendArticleItem, fetchFrontendArticleList, fetchFrontendTrending } from '@/api/frontend-article'
import { createLatestGuard, toSingleId } from '@/utils/index'

function getInitList<T>(): ListStore<T> {
    return {
        data: [] as T,
        path: '',
        hasNext: 0,
        hasPrev: 0,
        page: 1,
    }
}

export type PageType = 'lists' | 'visit' | 'category' | 'search'

const pageTypeArr: PageType[] = ['lists', 'visit', 'category', 'search']

/**
 * 计算点赞后的文章快照，点赞数不会小于 0
 * @param article 文章
 * @param status 点赞后的状态
 */
function nextLikeState(article: Article, status: boolean): Article {
    return {
        ...article,
        like: status ? article.like + 1 : Math.max(0, article.like - 1),
        like_status: status,
    }
}

const usePiniaStore = defineStore('frontendArticleStore', () => {
    const state: FArticleStore = reactive({
        lists: getInitList<Article[]>(),
        visit: getInitList<Article[]>(),
        category: getInitList<Article[]>(),
        search: getInitList<Article[]>(),
        item: {
            data: null,
            path: '',
            isLoad: false,
        },
        trending: [],
    })

    const listGuard: Record<PageType, ReturnType<typeof createLatestGuard>> = {
        lists: createLatestGuard(),
        visit: createLatestGuard(),
        category: createLatestGuard(),
        search: createLatestGuard(),
    }
    const itemGuard = createLatestGuard()

    /**
     * 读取文章列表
     * @param config 请求参数
     * @param pageType 列表类型
     */
    const getArticleList = async (config: ApiConfig, pageType: PageType = 'lists') => {
        const requestedPage = Number(config.page) || 1
        const requestedPath = config.path || ''
        const current = state[pageType]
        if (current.data.length > 0 && requestedPath === current.path && requestedPage === 1) {
            return
        }
        const token = listGuard[pageType].next()
        if (requestedPage === 1 && requestedPath !== current.path) {
            state[pageType] = getInitList<Article[]>()
        }
        const { code, data } = await fetchFrontendArticleList({ ...config, page: requestedPage })
        if (!listGuard[pageType].isLatest(token)) {
            return
        }
        if (code === 200 && data) {
            const list = data.list ?? []
            const samePath = state[pageType].path === requestedPath
            const prev = requestedPage === 1 || !samePath ? [] : state[pageType].data
            state[pageType] = {
                data: requestedPage === 1 ? list : prev.concat(list),
                hasNext: data.hasNext ?? 0,
                hasPrev: data.hasPrev ?? 0,
                page: requestedPage + 1,
                path: requestedPath,
            }
            return
        }
        if (requestedPage === 1) {
            state[pageType] = {
                ...getInitList<Article[]>(),
                path: requestedPath,
            }
        }
    }
    /**
     * 读取文章详情
     * @param config 请求参数
     */
    const getArticleItem = async (config: ApiConfig) => {
        const requestedId = toSingleId(config.id)
        if (state.item.isLoad && state.item.data?._id === requestedId) {
            return
        }
        const token = itemGuard.next()
        if (state.item.data?._id !== requestedId) {
            state.item.isLoad = false
        }
        try {
            const { code, data } = await fetchFrontendArticleItem({ ...config, id: requestedId })
            if (!itemGuard.isLatest(token)) {
                return
            }
            if (code === 200 && data) {
                state.item = {
                    data,
                    ...config,
                    id: requestedId,
                    isLoad: true,
                }
                return
            }
            state.item = {
                data: null,
                ...config,
                id: requestedId,
                isLoad: true,
            }
        }
        catch {
            if (!itemGuard.isLatest(token)) {
                return
            }
            state.item = {
                data: null,
                ...config,
                id: requestedId,
                isLoad: true,
            }
        }
    }
    /**
     * 读取热门列表
     */
    const getTrending = async () => {
        if (state.trending.length) {
            return
        }
        const { code, data } = await fetchFrontendTrending()
        if (code === 200 && data) {
            state.trending = data.list
        }
    }
    /**
     * 编辑点赞状态
     * @param payload 请求参数
     * @param payload.id ID
     * @param payload.status 状态
     */
    const modifyLikeStatus = (payload: { id: string, status: boolean }) => {
        const { id, status } = payload
        if (state.item.data && state.item.data._id === id) {
            state.item.data = nextLikeState(state.item.data, status)
        }
        pageTypeArr.forEach((page) => {
            const index = state[page].data.findIndex((item: Article) => item._id === id)
            if (index > -1) {
                const row = state[page].data[index]
                if (row) {
                    state[page].data.splice(index, 1, nextLikeState(row, status))
                }
            }
        })
    }
    /**
     * 评论成功后同步文章评论数
     * @param id 文章 ID
     */
    const increaseCommentCount = (id: string) => {
        if (state.item.data?._id === id) {
            state.item.data.comment_count += 1
        }
        pageTypeArr.forEach((page) => {
            const index = state[page].data.findIndex(item => item._id === id)
            if (index > -1) {
                const row = state[page].data[index]
                if (row) {
                    state[page].data.splice(index, 1, {
                        ...row,
                        comment_count: row.comment_count + 1,
                    })
                }
            }
        })
    }

    return {
        ...toRefs(state),
        getArticleList,
        getArticleItem,
        getTrending,
        modifyLikeStatus,
        increaseCommentCount,
    }
})

export default usePiniaStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
