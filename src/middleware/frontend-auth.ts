/* eslint-disable node/prefer-global/process */

export default defineNuxtRouteMiddleware(() => {
    if (process.server) {
        const headers = useRequestHeaders(['cookie'])
        const cookies = utilsParseCookies(headers.cookie || '')
        if (!cookies.user)
            return navigateTo('/')
    }
    if (process.client) {
        const fronendUser = useCookie<string>('user')
        if (!fronendUser.value)
            return navigateTo('/')
    }
})
