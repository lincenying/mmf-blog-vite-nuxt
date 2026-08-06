import type { ApiConfig, Comment } from '@/types'

/**
 * 前台评论列表
 */
export function fetchFrontendCommentList(config: ApiConfig & { cache?: boolean }) {
    return useHttp.$get<ResData<ResDataLists<Comment>>>('/api/frontend/comment/list', {
        ...config,
        path: undefined,
        cache: true,
    })
}

/**
 * 发表评论
 */
export function insertFrontendComment(body: { id: string, content: string }) {
    return useHttp.$post<ResData<Comment>>('/api/frontend/comment/insert', {}, { body })
}
