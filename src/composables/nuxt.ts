import type { ComputedRef } from 'vue'
import type { LocationQueryValue } from 'vue-router'

/**
 * 读取路由 params，并转为泛型默认值
 */
export function useRouteParam<T = string>(name: string, init?: T): ComputedRef<T> {
    const route = useRoute()
    return computed(() => {
        // typedPages 下 params 为各页面联合类型，动态 key 需按 Record 读取
        const params = route.params as Record<string, string | string[] | undefined>
        const value = params[name]
        if (Array.isArray(value)) {
            return (value[0] ?? init) as T
        }
        return (value ?? init) as T
    })
}

/**
 * 读取路由 query，并转为泛型默认值
 */
export function useRouteQuery<T = string>(name: string, init?: T): ComputedRef<T> {
    const route = useRoute()
    return computed(() => {
        const value = route.query[name] as LocationQueryValue | LocationQueryValue[] | undefined
        if (Array.isArray(value)) {
            return (value[0] ?? init) as T
        }
        return (value ?? init) as T
    })
}
