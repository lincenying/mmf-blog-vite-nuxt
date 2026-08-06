import type { App, Plugin } from 'vue'

let installed = false
let editorModule: Plugin | null = null

/**
 * 仅在后台编辑页按需加载并注册 Markdown 编辑器，避免打进前台主包
 */
export async function ensureMarkdownEditor(app: App) {
    if (!editorModule) {
        const mod = await import('~/utils/markdown-editor')
        editorModule = mod.default as Plugin
    }
    if (!installed) {
        app.use(editorModule)
        installed = true
    }
    return editorModule as Plugin & {
        vMdParser: {
            themeConfig: {
                markdownParser: {
                    render: (content: string) => string
                }
            }
        }
    }
}
