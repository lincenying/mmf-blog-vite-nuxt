import type { UserCookies } from '@/types'

/**
 * 将前端登录 Cookie 同步到 Pinia，保证 SSR/CSR 导航与点赞/评论读到正确登录态
 */
export default defineNuxtPlugin(() => {
    const globalStore = useGlobalStore()
    const nuxtApp = useNuxtApp()

    const user = useCookie<string | null>('user')
    const userid = useCookie<string | null>('userid')
    const username = useCookie<string | null>('username')
    const useremail = useCookie<string | null>('useremail')

    /**
     * 从 Cookie 读取登录信息。刷新时 httpOnly Cookie 只有请求头里能读到
     */
    function readCookies(): UserCookies {
        const fromUseCookie: UserCookies = {
            user: user.value || undefined,
            userid: userid.value || undefined,
            username: username.value || undefined,
            useremail: useremail.value || undefined,
        }
        if (!import.meta.server) {
            return fromUseCookie
        }
        const parsed = utilsParseCookies(useRequestHeader('cookie') || '')
        return {
            user: parsed.user || fromUseCookie.user,
            userid: parsed.userid || fromUseCookie.userid,
            username: parsed.username || fromUseCookie.username,
            useremail: parsed.useremail || fromUseCookie.useremail,
        }
    }

    /**
     * 写入全局 store。水合时客户端读不到 httpOnly Cookie，不能覆盖 SSR 已渲染的登录态
     */
    function syncCookies(force = false) {
        const next = readCookies()
        if (!force && import.meta.client && nuxtApp.isHydrating && !next.user && globalStore.cookies.user) {
            return
        }
        globalStore.setCookies(next)
    }

    syncCookies()

    // 登录、退出后 Cookie 变化时再覆盖 store
    if (import.meta.client) {
        watch([user, userid, username, useremail], () => {
            syncCookies(true)
        })
    }
})
