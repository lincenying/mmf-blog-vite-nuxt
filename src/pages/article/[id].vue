<template>
    <div class="main wrap">
        <div class="main-left">
            <div v-if="!isLoad" class="card card-content-loader">
                <ContentLoader :height="160" :width="660" :speed="2" primary-color="#f3f3f3" secondary-color="#ecebeb">
                    <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" /> <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
                    <rect x="0" y="80" rx="3" ry="3" width="550" height="6.4" /> <rect x="0" y="100" rx="3" ry="3" width="620" height="6.4" />
                    <rect x="0" y="120" rx="3" ry="3" width="401" height="6.4" /> <rect x="0" y="140" rx="3" ry="3" width="501" height="6.4" />
                    <circle cx="30" cy="30" r="30" />
                </ContentLoader>
            </div>
            <template v-else-if="articleData">
                <div class="card card-question-head">
                    <div class="question-content">
                        <NuxtLink :to="`/category/${articleData.category}`" class="topic-link-item">{{ articleData.category_name }}</NuxtLink>
                        <h2 class="question-title">
                            <NuxtLink :to="`/article/${articleData._id}`" class="question-title-link">{{ articleData.title }}</NuxtLink>
                        </h2>
                    </div>
                </div>
                <div class="card card-answer">
                    <div class="answer-content">
                        <!-- eslint-disable-next-line vue/no-v-html -- 内容来自后台 CMS，经 DOMPurify 消毒 -->
                        <div class="markdown-body vuepress-markdown-body github-markdown-body article-content" v-html="safeHtml" />
                    </div>
                    <item-actions :item="articleData" />
                </div>
                <frontend-comment :comments="comments" />
            </template>
            <template v-else>
                <div class="card card-answer"><div class="answer-content">该文章不存在, 或者该文章已经被删除</div></div>
            </template>
        </div>
        <div class="main-right">
            <aside-category :category="category" />
            <aside-trending :trending="trending" />
            <aside-other />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
import { sanitizeArticleHtml } from '~/utils/sanitize-html'

defineOptions({
    name: 'FrontendArticle',
})

const route = useRoute()
const id = $(useRouteParam('id'))

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const frontendArticleStore = useFrontendArticleStore()
const globalCommentStore = useGlobalCommentStore()

const { lists: category } = $(storeToRefs(globalCategoryStore))
const { item, trending } = $(storeToRefs(frontendArticleStore))
const { lists: comments } = $(storeToRefs(globalCommentStore))

/**
 * 按当前路由拉取文章详情和评论
 */
async function loadArticleDetail() {
    const currentId = id
    const currentPath = route.fullPath
    await Promise.all([
        globalCommentStore.getCommentList({ id: currentId, path: currentPath, page: 1, limit: 10 }),
        frontendArticleStore.getArticleItem({ id: currentId, path: currentPath }),
    ])
}

await useRouteData(
    `frontend-article-detail-${id}`,
    () => !!item.isLoad && item.data?._id === id && comments.path === route.fullPath,
    loadArticleDetail,
    () => route.path.startsWith('/article/'),
)
await callOnce('frontend-article-category', () => globalCategoryStore.getCategoryList({}).then(() => true))
await callOnce('frontend-article-trending', () => frontendArticleStore.getTrending().then(() => true))

const isLoad = $computed(() => !!item.isLoad)
const articleData = $computed(() => (item.isLoad ? item.data : null))

useAutoScroll(`frontend-article-detail-${id}`)

/**
 * 外链加 target=_blank 并消毒 HTML
 */
const safeHtml = $computed(() => sanitizeArticleHtml(articleData?.html || ''))

const headTitle = computed(() => {
    return articleData?.title ? `${articleData.title} - M.M.F 小屋` : 'M.M.F 小屋'
})

const headDescription = computed(() => {
    return createSeoDescription(articleData?.content || articleData?.html) || headTitle.value
})

const requestURL = useRequestURL()
const ogUrl = computed(() => {
    if (!articleData?._id) {
        return undefined
    }
    return `${requestURL.origin}/article/${articleData._id}`
})

usePageSeo({
    title: headTitle,
    description: headDescription,
    url: ogUrl,
    ogType: 'article',
})
</script>
