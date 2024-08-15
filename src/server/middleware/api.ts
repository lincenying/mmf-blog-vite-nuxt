import process from 'node:process'
import { createProxyEventHandler } from 'h3-proxy'

export default defineEventHandler(
    createProxyEventHandler({
        target: `${process.env.NUXT_ENV_API_URL || process.env.NUXT_ENV_HOST_API_URL || 'https://api.mmxiaowu.com'}`,
        changeOrigin: true,
        pathRewrite: {
            '^/api': '/api',
        },
        pathFilter: ['/api/**'],
    }),
)
