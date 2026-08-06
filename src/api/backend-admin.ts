import type { ApiConfig, User } from '@/types'

/**
 * 后台管理员列表
 */
export function fetchBackendAdminList(config: Pick<ApiConfig, 'page' | 'path'> & { cache?: boolean, limit?: number }) {
    return useHttp.$get<ResData<ResDataLists<User>>>('/api/backend/admin/list', {
        ...config,
        path: undefined,
        cache: true,
    })
}

/**
 * 后台管理员详情
 */
export function fetchBackendAdminItem(config: Pick<ApiConfig, 'id' | 'path'>) {
    return useHttp.$get<ResData<User>>('/api/backend/admin/item', {
        ...config,
        path: undefined,
    })
}
