export default defineNuxtRouteMiddleware(() => {
    if (import.meta.server) {
        const headers = useRequestHeaders(['cookie'])
        const cookies = utilsParseCookies(headers.cookie || '')
        if (!cookies.b_user) {
            return navigateTo('/_backend/login')
        }
    }
    if (import.meta.client) {
        const backendUser = useCookie<string>('b_user')
        if (!backendUser.value) {
            return navigateTo('/_backend/login')
        }
    }
})
