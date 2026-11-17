import DOMPurify from 'isomorphic-dompurify'

/**
 * 消毒 HTML，供文章详情 v-html 使用（内容来自后台 CMS）
 */
export function sanitizeHtml(html: string) {
    if (!html) {
        return ''
    }
    return DOMPurify.sanitize(html, {
        ADD_ATTR: ['target', 'rel'],
    })
}

/**
 * 外链补 target/rel 后再消毒，避免重复属性和 javascript: 链接
 * @param html 文章 HTML
 */
export function sanitizeArticleHtml(html: string) {
    if (!html) {
        return ''
    }
    const withSafeLinks = html.replace(/<a\b([^>]*)>/gi, (full, attrs: string) => {
        const hrefMatch = /\bhref\s*=\s*(['"])(.*?)\1/i.exec(attrs)
        const href = hrefMatch?.[2] || ''
        if (!/^https?:\/\//i.test(href)) {
            return full
        }
        let nextAttrs = attrs
        if (!/\btarget\s*=/i.test(nextAttrs)) {
            nextAttrs += ' target="_blank"'
        }
        if (!/\brel\s*=/i.test(nextAttrs)) {
            nextAttrs += ' rel="noopener noreferrer"'
        }
        return `<a${nextAttrs}>`
    })
    return sanitizeHtml(withSafeLinks)
}
