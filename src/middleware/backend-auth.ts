/**
 * 后台鉴权：先检查 Cookie，再请求管理员列表接口校验会话是否有效
 */
export default defineNuxtRouteMiddleware(async () => {
    const authChecked = useState('backend-auth-checked', () => false)
    const authValid = useState('backend-auth-valid', () => false)
    const backendSession = useState('backend-b-user', () => false)

    /**
     * 会话失效时清除后台登录态
     */
    function clearBackendCookie() {
        useCookie('b_user').value = null
        backendSession.value = false
        authChecked.value = true
        authValid.value = false
    }

    const requestCookies = import.meta.server
        ? utilsParseCookies(useRequestHeaders(['cookie']).cookie || '')
        : null
    if (import.meta.server && requestCookies?.b_user) {
        backendSession.value = true
    }
    // 客户端 useCookie 读不到 httpOnly Cookie，SSR 写入的会话标记仍然有效
    const hasSession = import.meta.server
        ? !!requestCookies?.b_user
        : !!(useCookie<string | null>('b_user').value || backendSession.value)

    if (!hasSession) {
        return navigateTo('/_backend/login')
    }

    if (authChecked.value) {
        if (!authValid.value) {
            return navigateTo('/_backend/login')
        }
        return
    }

    try {
        const headers = useRequestHeaders(['cookie'])
        const res = await $fetch<ResData<unknown>>('/api/backend/admin/list', {
            headers,
            credentials: 'include',
            query: { page: 1, limit: 1 },
        })
        authChecked.value = true
        authValid.value = res.code === 200
        if (!authValid.value) {
            clearBackendCookie()
            return navigateTo('/_backend/login')
        }
    }
    catch {
        // 代理或网络失败不代表会话失效，避免进入后台时把登录态清掉
        return navigateTo('/_backend/login')
    }
})
