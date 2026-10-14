/**
 * 页面 SEO：统一 title / description / Open Graph
 */
export function usePageSeo(options: {
    title: MaybeRefOrGetter<string>
    description?: MaybeRefOrGetter<string>
    url?: MaybeRefOrGetter<string | undefined>
}) {
    const title = computed(() => toValue(options.title))
    const description = computed(() => toValue(options.description) || title.value)
    const url = computed(() => toValue(options.url))

    useSeoMeta({
        title: () => title.value,
        description: () => description.value,
        ogTitle: () => title.value,
        ogDescription: () => description.value,
        ogType: 'website',
        ogUrl: () => url.value,
        twitterCard: 'summary',
        twitterTitle: () => title.value,
        twitterDescription: () => description.value,
    })
}

/**
 * 从 HTML / Markdown 文本生成摘要
 */
export function createSeoDescription(raw: string | undefined | null, maxLen = 160) {
    if (!raw) {
        return ''
    }
    const text = raw
        .replace(/<[^>]+>/g, ' ')
        .replace(/[#>*`~\-[\]()!]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    if (text.length <= maxLen) {
        return text
    }
    return `${text.slice(0, maxLen - 1)}…`
}
