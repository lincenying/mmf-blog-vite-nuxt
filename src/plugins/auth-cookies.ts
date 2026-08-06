/**
 * 将前端登录 Cookie 同步到 Pinia，保证 SSR/CSR 导航与点赞/评论读到正确登录态
 */
export default defineNuxtPlugin(() => {
    const globalStore = useGlobalStore()

    const user = useCookie<string | null>('user')
    const userid = useCookie<string | null>('userid')
    const username = useCookie<string | null>('username')
    const useremail = useCookie<string | null>('useremail')

    /**
     * 从 Cookie 写入全局 store
     */
    function syncCookiesFromBrowser() {
        globalStore.setCookies({
            user: user.value || undefined,
            userid: userid.value || undefined,
            username: username.value || undefined,
            useremail: useremail.value || undefined,
        })
    }

    syncCookiesFromBrowser()

    // 客户端 Cookie 变化时保持 store 同步（如登录 Set-Cookie 后）
    if (import.meta.client) {
        watch([user, userid, username, useremail], () => {
            syncCookiesFromBrowser()
        })
    }
})
