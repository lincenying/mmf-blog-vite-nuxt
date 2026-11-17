/**
 * 前台鉴权：先检查 Cookie，再请求账户接口校验会话是否有效
 */
export default defineNuxtRouteMiddleware(async () => {
    const authChecked = useState('frontend-auth-checked', () => false)
    const authValid = useState('frontend-auth-valid', () => false)
    const globalStore = useGlobalStore()

    /**
     * 会话失效时清除前端登录态
     */
    function clearFrontendCookies() {
        useCookie('user').value = null
        useCookie('userid').value = null
        useCookie('username').value = null
        useCookie('useremail').value = null
        globalStore.setCookies({})
        authChecked.value = true
        authValid.value = false
    }

    const requestCookies = import.meta.server ? utilsParseCookies(useRequestHeaders(['cookie']).cookie || '') : null
    // 客户端 useCookie 读不到 httpOnly Cookie，SSR 已写入 store 的登录态仍然有效
    const hasSession = import.meta.server ? !!requestCookies?.user : !!(useCookie<string | null>('user').value || globalStore.cookies.user)

    if (!hasSession) {
        return navigateTo('/')
    }

    if (authChecked.value) {
        if (!authValid.value) {
            return navigateTo('/')
        }
        return
    }

    try {
        const requestFetch = useRequestFetch()
        const res = await requestFetch<ResData<unknown>>('/api/frontend/user/account', {
            credentials: 'include',
        })
        authChecked.value = true
        authValid.value = res.code === 200
        if (!authValid.value) {
            clearFrontendCookies()
            return navigateTo('/')
        }
    }
    catch {
        // 代理或网络失败不代表会话失效，避免一点头像就把登录态清掉
        return navigateTo('/')
    }
})
