import VueMarkdownEditor from '@kangc/v-md-editor'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress'
import Prism from 'prismjs'

import 'prismjs/components/prism-json'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-twig'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-less'
import 'prismjs/components/prism-bash'

import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

VueMarkdownEditor.use(vuepressTheme, {
    Prism,
    codeHighlightExtensionMap: {
        vue: 'html',
    },
})

export default VueMarkdownEditor
export const MarkdownEditor = VueMarkdownEditor
