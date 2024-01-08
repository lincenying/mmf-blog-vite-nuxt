import VueMarkdownEditor from '@kangc/v-md-editor'
import vuePressTheme from '@kangc/v-md-editor/lib/theme/github'

import hljs from 'highlight.js'

export default defineNuxtPlugin((nuxtApp) => {
    VueMarkdownEditor.use(vuePressTheme, {
        Hljs: hljs,
    })

    nuxtApp.vueApp.use(VueMarkdownEditor)
})
