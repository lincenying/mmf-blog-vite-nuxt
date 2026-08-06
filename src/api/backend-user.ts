import type { ApiConfig, User } from '@/types'

/**
 * 后台用户列表
 */
export function fetchBackendUserList(config: ApiConfig & { cache?: boolean }) {
    return useHttp.$get<ResData<ResDataLists<User>>>('/api/backend/user/list', {
        ...config,
        path: undefined,
        cache: true,
    })
}

/**
 * 后台用户详情
 */
export function fetchBackendUserItem(config: ApiConfig) {
    return useHttp.$get<ResData<User>>('/api/backend/user/item', {
        ...config,
        path: undefined,
    })
}
