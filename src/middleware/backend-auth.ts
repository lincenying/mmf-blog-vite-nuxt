/* eslint-disable node/prefer-global/process */
import cookies from 'js-cookie'

export default defineNuxtRouteMiddleware(() => {
    if (process.server) {
        const headers = useRequestHeaders(['cookie'])
        const cookies = utilsParseCookies(headers.cookie || '')
        if (!cookies.b_user)
            return navigateTo('/_backend/login')
    }
    if (process.client) {
        if (!cookies.get('b_user'))
            return navigateTo('/_backend/login')
    }
})
