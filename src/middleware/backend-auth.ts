/**
 * 后台鉴权：先检查 Cookie，再请求管理员列表接口校验会话是否有效
 */
export default defineNuxtRouteMiddleware(async () => {
    const authChecked = useState('backend-auth-checked', () => false)
    const authValid = useState('backend-auth-valid', () => false)

    const clearBackendCookie = () => {
        useCookie('b_user').value = null
        authChecked.value = true
        authValid.value = false
    }

    if (import.meta.server) {
        const headers = useRequestHeaders(['cookie'])
        const cookies = utilsParseCookies(headers.cookie || '')
        if (!cookies.b_user) {
            clearBackendCookie()
            return navigateTo('/_backend/login')
        }
    }
    else {
        const backendUser = useCookie<string>('b_user')
        if (!backendUser.value) {
            clearBackendCookie()
            return navigateTo('/_backend/login')
        }
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
        clearBackendCookie()
        return navigateTo('/_backend/login')
    }
})
