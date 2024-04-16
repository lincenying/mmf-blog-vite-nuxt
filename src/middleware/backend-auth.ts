/* eslint-disable node/prefer-global/process */

export default defineNuxtRouteMiddleware(() => {
    if (process.server) {
        const headers = useRequestHeaders(['cookie'])
        const cookies = utilsParseCookies(headers.cookie || '')
        if (!cookies.b_user) {
            return navigateTo('/_backend/login')
        }
    }
    if (process.client) {
        const backendUser = useCookie<string>('b_user')
        if (!backendUser.value) {
            return navigateTo('/_backend/login')
        }
    }
})
