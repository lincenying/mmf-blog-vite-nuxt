import { acceptHMRUpdate, defineStore } from 'pinia'

import type { ApiConfig, Article, FArticleStore, ListStore } from '@/types'

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

const usePiniaStore = defineStore('frontendArticleStore', () => {
    const state: FArticleStore = reactive({
        lists: getInitList<Article[]>(),
        visit: getInitList<Article[]>(),
        category: getInitList<Article[]>(),
        search: getInitList<Article[]>(),
        item: {
            data: null,
            path: '',
        },
        trending: [],
    })

    /**
     * 读取文章列表
     * @param config 请求参数
     */
    const getArticleList = async (config: ApiConfig, pageType: PageType = 'lists') => {
        if (state.lists.data.length > 0 && config.path === state.lists.path && config.page === 1) {
            return
        }
        const { code, data } = await useHttp().$get<ResData<ResDataLists<Article>>>('/api/frontend/article/list', { ...config, path: undefined, cache: true })
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

            state[pageType] = {
                data: page === 1 ? list : state.lists.data.concat(list),
                hasNext,
                hasPrev,
                page: (page || 1) + 1,
                path,
            }
        }
    }
    /**
     * 读取文章详情
     * @param config 请求参数
     */
    const getArticleItem = async (config: ApiConfig) => {
        const { code, data } = await useHttp().$get<ResData<Article>>('/api/frontend/article/item', { ...config, path: undefined, markdown: 1, cache: true })
        if (code === 200 && data) {
            state.item = {
                data,
                ...config,
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
        const { code, data } = await useHttp().$get<ResData<ResDataList<Article>>>('/api/frontend/trending', { cache: true })
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
    const modifyLikeStatus = (payload: { id: string; status: boolean }) => {
        const { id, status } = payload
        if (state.item.data && state.item.data._id === id) {
            if (status) {
                state.item.data.like++
            }
            else {
                state.item.data.like--
            }
            state.item.data.like_status = status
        }
        pageTypeArr.forEach((page) => {
            const index = state[page].data.findIndex((item: Article) => item._id === id)
            if (index > -1) {
                const obj: Article = Object.assign({}, state.lists.data[index])
                if (status) {
                    obj.like++
                }
                else {
                    obj.like--
                }
                obj.like_status = status
                state[page].data.splice(index, 1, obj)
            }
        })
    }

    return {
        ...toRefs(state),
        getArticleList,
        getArticleItem,
        getTrending,
        modifyLikeStatus,
    }
})

export default usePiniaStore

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePiniaStore, import.meta.hot))
}
