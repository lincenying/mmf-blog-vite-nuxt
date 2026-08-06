import type { ApiConfig, Article } from '@/types'

/**
 * 后台文章列表
 */
export function fetchBackendArticleList(config: ApiConfig & { cache?: boolean }) {
    return useHttp.$get<ResData<ResDataLists<Article>>>('/api/backend/article/list', {
        ...config,
        path: undefined,
        cache: true,
    })
}

/**
 * 后台文章详情
 */
export function fetchBackendArticleItem(config: ApiConfig) {
    return useHttp.$get<ResData<Article>>('/api/backend/article/item', {
        ...config,
        path: undefined,
    })
}
