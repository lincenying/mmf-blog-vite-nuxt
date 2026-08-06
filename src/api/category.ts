import type { ApiConfig, Category } from '@/types'

/**
 * 分类列表
 */
export function fetchCategoryList(config: ApiConfig & { cache?: boolean }) {
    return useHttp.$get<ResData<ResDataList<Category>>>('/api/backend/category/list', {
        ...config,
        path: undefined,
        cache: true,
    })
}

/**
 * 分类详情
 */
export function fetchCategoryItem(config: ApiConfig) {
    return useHttp.$get<ResData<Nullable<Category>>>('/api/backend/category/item', {
        ...config,
        path: undefined,
    })
}
