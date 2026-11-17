/**
 * 后台鉴权。
 * `/_backend/**` 关闭了 SSR，刷新后客户端读不到 httpOnly 的 `b_user`，
 * 必须用浏览器请求（会自动带上 Cookie）校验，不能因为读不到 Cookie 就跳回登录页。
 */
export default defineNuxtRouteMiddleware(async () => {
    const authChecked = useState('backend-auth-checked', () => false)
    const authValid = useState('backend-auth-valid', () => false)
    const backendSession = useState('backend-b-user', () => false)

    /**
     * 接口明确拒绝会话时清除后台登录态
     */
    function clearBackendCookie() {
        useCookie('b_user').value = null
        backendSession.value = false
        authChecked.value = true
        authValid.value = false
    }

    /**
     * 判断请求失败是不是未登录，而不是代理或网络异常
     */
    function isUnauthorized(error: unknown) {
        if (!error || typeof error !== 'object') {
            return false
        }
        const status = 'statusCode' in error ? error.statusCode : 'status' in error ? error.status : undefined
        return status === 401 || status === 403
    }

    // 服务端 $fetch 经常带不上浏览器 Cookie，且后台页面不在服务端渲染。
    // 这里只记下请求头里的会话，真正校验交给客户端。
    if (import.meta.server) {
        const cookies = utilsParseCookies(useRequestHeader('cookie') || '')
        if (cookies.b_user) {
            backendSession.value = true
        }
        return
    }

    if (authChecked.value) {
        if (!authValid.value) {
            return navigateTo('/_backend/login')
        }
        return
    }

    try {
        const res = await $fetch<ResData<unknown>>('/api/backend/admin/list', {
            credentials: 'include',
            query: { page: 1, limit: 1 },
        })
        authChecked.value = true
        authValid.value = res.code === 200
        if (res.code === 200) {
            backendSession.value = true
            return
        }
        clearBackendCookie()
        return navigateTo('/_backend/login')
    }
    catch (error) {
        if (isUnauthorized(error)) {
            clearBackendCookie()
            return navigateTo('/_backend/login')
        }
        // 代理或网络失败不代表会话失效，留在当前页
    }
})
