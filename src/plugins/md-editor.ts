import VueMarkdownEditor from '@kangc/v-md-editor'
import vuePressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'

// Prism
import Prism from 'prismjs'

// highlight code
import 'prismjs/components/prism-json'

export default defineNuxtPlugin((nuxtApp) => {
    VueMarkdownEditor.use(vuePressTheme, {
        Prism,
    })

    nuxtApp.vueApp.use(VueMarkdownEditor)
})
