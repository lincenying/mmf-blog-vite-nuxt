export default defineNuxtRouteMiddleware(() => {
    if (import.meta.server) {
        const headers = useRequestHeaders(['cookie'])
        const cookies = utilsParseCookies(headers.cookie || '')
        if (!cookies.user) {
            return navigateTo('/')
        }
    }
    if (import.meta.client) {
        const fronendUser = useCookie<string>('user')
        if (!fronendUser.value) {
            return navigateTo('/')
        }
    }
})
