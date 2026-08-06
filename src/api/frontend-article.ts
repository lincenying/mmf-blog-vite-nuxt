import type { ApiConfig, Article } from '@/types'

type ListQuery = ApiConfig & { cache?: boolean, markdown?: number }

/**
 * 前台文章列表
 */
export function fetchFrontendArticleList(config: ListQuery) {
    return useHttp.$get<ResData<ResDataLists<Article>>>('/api/frontend/article/list', {
        ...config,
        path: undefined,
        cache: true,
    })
}

/**
 * 前台文章详情
 */
export function fetchFrontendArticleItem(config: ListQuery) {
    return useHttp.$get<ResData<Article>>('/api/frontend/article/item', {
        ...config,
        path: undefined,
        markdown: 1,
        cache: true,
    })
}

/**
 * 前台热门文章
 */
export function fetchFrontendTrending() {
    return useHttp.$get<ResData<ResDataList<Article>>>('/api/frontend/trending', { cache: true })
}
