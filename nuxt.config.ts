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

    elementPlus: { /** Options */ },

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

    nitro: {
        esbuild: {
            options: {
                target: 'esnext',
            },
        },
        prerender: {
            crawlLinks: false,
            routes: ['/'],
            ignore: ['/article'],
        },
        routeRules: {
            '/api/**': {
                proxy: `${process.env.HOST_API_URL || 'https://api.mmxiaowu.com'}/api/**`,
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
        enabled: true,
    },

    devServer: {
        port: 7223,
    },

    imports: {
        presets: [
            {
                from: 'vue-loading-overlay',
                imports: ['useLoading'],
            },
        ],
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
})
