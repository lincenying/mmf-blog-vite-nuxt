import process from 'node:process'
import { createProxyEventHandler } from 'h3-proxy'

/**
 * 将 /api/** 反向代理到外部 Express API
 */
export default defineEventHandler((event) => {
    const config = useRuntimeConfig(event)
    const target = config.apiUrl
        || process.env.NUXT_ENV_API_URL
        || process.env.NUXT_ENV_HOST_API_URL
        || (import.meta.dev ? 'https://api.mmxiaowu.com' : '')

    if (!target) {
        throw createError({
            statusCode: 500,
            statusMessage: 'API URL is not configured (set NUXT_API_URL or NUXT_ENV_API_URL)',
        })
    }

    return createProxyEventHandler({
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api',
        },
        pathFilter: ['/api/**'],
    })(event)
})
