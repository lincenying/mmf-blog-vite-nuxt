import type { AnyFn } from '@vueuse/core'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import md5 from 'md5'

export function useGlobal() {
    const ins = getCurrentInstance()!

    const ctx = ins.appContext.config.globalProperties
    const options = ins.type

    return {
        ctx,
        options,
    }
}

/**
 * 竞态锁
 * @param fn 回调函数
 * @param autoUnlock 是否自动解锁
 * @returns void
 * ```
 * autoUnlock === true 不管 fn 返回什么, 都自动解锁
 * autoUnlock === false 不管 fn 返回什么, 都不自动解锁
 * autoUnlock === 'auto' 当 fn 返回 false 时, 不自动解锁, 返回其他值时, 自动解锁
 * ```
 */
export function useLockFn(fn: AnyFn, autoUnlock: boolean | string = 'auto') {
    const [lock, toggleLock] = useToggle(false)
    return async (...args: any[]) => {
        if (lock.value) {
            return
        }
        toggleLock(true)
        try {
            const $return: any = await fn(...args)
            if (autoUnlock === true || (autoUnlock === 'auto' && $return !== false)) {
                toggleLock(false)
            }
        }
        catch (e) {
            toggleLock(false)
            throw e
        }
    }
}

/**
 * 保持滚动条位置
 */
export function useSaveScroll() {
    const route = useRoute()
    const appShellStore = useAppShellStore()

    const { historyPageScrollTop } = storeToRefs(appShellStore)

    onActivated(() => {
        const currPath = route.fullPath
        const scrollTop = historyPageScrollTop.value[currPath] || 0
        setTimeout(() => {
            window.scrollTo(0, scrollTop)
        }, 350)
    })

    onBeforeRouteLeave((_to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
        const scrollTop = Math.max(window.scrollY, document.documentElement.scrollTop, document.body.scrollTop)
        if (scrollTop !== 0) {
            appShellStore.saveScrollTop({
                path: from.fullPath,
                scrollTop,
            })
        }
        next()
    })
}

/**
 * 生成gAvatar头像地址
 * @param email 邮箱
 * @param width 图片宽度
 * @returns 图片地址
 */
export function useAvatar(email?: string, width?: number) {
    email = email || '123456'
    email = decodeURIComponent(email)
    width = width || 256
    // return `https://cdn.v2ex.com/gravatar/${md5(email)}?s=${width}&d=identicon&r=g`
    // return `https://dn-qiniu-avatar.qbox.me/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
    // return `https://fdn.geekzu.org/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
    return `https://cravatar.cn/avatar/${md5(email)}?s=${width}&d=identicon&r=g`
}

/**
 * element-plus弹窗
 * @param config 弹窗数据
 * @example
 * ```
 * showMsg('content')
 * showMsg({ type: 'success' | 'warning' | 'info' | 'error', content: 'content'})
 * ```
 */
export function showMsg(config: Obj | string) {
    let content, type: 'success' | 'warning' | 'info' | 'error'
    if (!config) {
        content = '接口返回数据错误'
        type = 'error'
    }
    else if (typeof config === 'string') {
        content = config
        type = 'error'
    }
    else {
        content = config.content
        type = config.type
    }
    ElMessage[type](content)
}

/**
 *
 * @param cookies cookies字符串
 * @returns object
 */
export function utilsParseCookies(cookies: string): { [key: string]: string } {
    const cookieArr = cookies.split(';')
    const cookieObj: { [key: string]: string } = {}
    cookieArr.forEach((cookie) => {
        const [key, value] = cookie.split('=')
        if (key && value) {
            const cookieKey = key.trim()
            const cookieValue = decodeURIComponent(value.trim())
            cookieObj[cookieKey] = cookieValue
        }
    })

    return cookieObj
}
