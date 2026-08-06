import process from 'node:process'
import { pwa } from './src/config/pwa'
import { appDescription } from './src/constants/index'

// 这些事需要移除的nuxt自动生成的路由
// const REMOVE_NUXT_ROUTES: string[] = [ ]

export default defineNuxtConfig({
    srcDir: 'src',

    modules: [
        '@vueuse/nuxt',
        '@unocss/nuxt',
        '@pinia/nuxt',
        '@nuxtjs/color-mode',
        '@vite-pwa/nuxt',
        '@element-plus/nuxt',
        '@vue-macros/nuxt',
    ],

    elementPlus: {
        /** Options */
    },

    experimental: {
        // when using generate, payload js assets included in sw precache manifest
        // but missing on offline, disabling extraction it until fixed
        payloadExtraction: false,
        renderJsonPayloads: true,
        typedPages: true,

        // @ts-expect-error 缺失类型
        inlineSSRStyles: false,
    },

    css: [
        '@unocss/reset/tailwind-compat.css',
    ],

    colorMode: {
        classSuffix: '',
    },

    runtimeConfig: {
        // 服务端 API 代理目标，可用 NUXT_API_URL 覆盖；兼容 NUXT_ENV_API_URL
        apiUrl: process.env.NUXT_API_URL || process.env.NUXT_ENV_API_URL || process.env.NUXT_ENV_HOST_API_URL || '',
        public: {
            uploadApi: process.env.NUXT_PUBLIC_UPLOAD_API || 'https://php.mmxiaowu.com',
        },
    },

    routeRules: {
        '/_backend/**': { ssr: false },
    },

    nitro: {
        esbuild: {
            options: {
                target: 'esnext',
            },
        },
    },

    app: {
        head: {
            viewport: 'width=device-width,initial-scale=1',
            link: [
                { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
                { rel: 'apple-touch-icon', href: '/static/img/icons/apple-touch-icon-180x180.png' },
            ],
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: appDescription },
                { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
            ],
        },
    },

    pwa,

    devtools: {
        enabled: process.env.NODE_ENV !== 'production',
    },

    devServer: {
        port: 7223,
    },

    vite: {
        server: {
            open: true,
            hmr: {
                port: 57223,
            },
        },
    },

    // hooks: {
    //     'pages:extend': (pages) => {
    //         // 过滤出你要删除掉路由（根据自己的需求写这里的过滤逻辑，可以把不想要的路由都去掉）
    //         const pagesToRemove = pages.filter(page => REMOVE_NUXT_ROUTES.includes(page.path))
    //         for (const page of pagesToRemove)
    //             pages.splice(pages.indexOf(page), 1)
    //         // 追加你自定义的路由
    //         pages.push({
    //             path: '/trending/:by',
    //             file: resolve(__dirname, 'src/pages/index.vue'),
    //         }, {
    //             path: '/category/:id',
    //             file: resolve(__dirname, 'src/pages/index.vue'),
    //         }, {
    //             path: '/search/:key',
    //             file: resolve(__dirname, 'src/pages/index.vue'),
    //         })
    //     },
    // },
    imports: {
        presets: [
            {
                from: 'vue-loading-overlay',
                imports: ['useLoading'],
            },
        ],
    },

    compatibilityDate: '2025-01-15',
})
