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

/**
 * 路由组件复用时补拉数据。
 * callOnce 只覆盖首次进入；路径变化，或缓存与当前页不一致时再请求。
 * @param key callOnce 缓存键
 * @param isFresh 当前 store 是否已经对应该路由
 * @param load 拉取函数
 * @param isActive 当前路由是否仍属于本页，离开时不请求
 */
export async function useRouteData(
    key: string,
    isFresh: () => boolean,
    load: () => Promise<unknown>,
    isActive?: () => boolean,
) {
    const route = useRoute()
    watch(() => route.fullPath, (next, prev) => {
        if (!prev || next === prev) {
            return
        }
        if (isActive && !isActive()) {
            return
        }
        void load()
    })
    await callOnce(key, () => load().then(() => true))
    if (!isFresh()) {
        await load()
    }
}
