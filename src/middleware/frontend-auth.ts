/**
 * 前台鉴权：先检查 Cookie，再请求账户接口校验会话是否有效
 */
export default defineNuxtRouteMiddleware(async () => {
    const authChecked = useState('frontend-auth-checked', () => false)
    const authValid = useState('frontend-auth-valid', () => false)

    const clearFrontendCookies = () => {
        useCookie('user').value = null
        useCookie('userid').value = null
        useCookie('username').value = null
        useCookie('useremail').value = null
        useGlobalStore().setCookies({})
        authChecked.value = true
        authValid.value = false
    }

    if (import.meta.server) {
        const headers = useRequestHeaders(['cookie'])
        const cookies = utilsParseCookies(headers.cookie || '')
        if (!cookies.user) {
            clearFrontendCookies()
            return navigateTo('/')
        }
    }
    else {
        const frontendUser = useCookie<string>('user')
        if (!frontendUser.value) {
            clearFrontendCookies()
            return navigateTo('/')
        }
    }

    if (authChecked.value) {
        if (!authValid.value) {
            return navigateTo('/')
        }
        return
    }

    try {
        const headers = useRequestHeaders(['cookie'])
        const res = await $fetch<ResData<unknown>>('/api/frontend/user/account', {
            headers,
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
        clearFrontendCookies()
        return navigateTo('/')
    }
})
