import DOMPurify from 'isomorphic-dompurify'

/**
 * 消毒 HTML，供文章详情 v-html 使用（内容来自后台 CMS）
 */
export function sanitizeHtml(html: string) {
    if (!html) {
        return ''
    }
    return DOMPurify.sanitize(html, {
        ADD_ATTR: ['target'],
    })
}
