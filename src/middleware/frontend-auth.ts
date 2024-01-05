/* eslint-disable node/prefer-global/process */
import cookies from 'js-cookie'

export default defineNuxtRouteMiddleware(() => {
    if (process.server) {
        const headers = useRequestHeaders(['cookie'])
        const cookies = utilsParseCookies(headers.cookie || '')
        if (!cookies.user)
            return navigateTo('/')
    }
    if (process.client) {
        if (!cookies.get('user'))
            return navigateTo('/')
    }
})
