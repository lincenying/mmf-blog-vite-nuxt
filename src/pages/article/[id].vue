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
                        <router-link :to="`/category/${articleData.category}`" class="topic-link-item">{{ articleData.category_name }}</router-link>
                        <h2 class="question-title">
                            <router-link :to="`/article/${articleData._id}`" class="question-title-link">{{ articleData.title }}</router-link>
                        </h2>
                    </div>
                </div>
                <div class="card card-answer">
                    <div class="answer-content">
                        <!-- eslint-disable-next-line vue/no-v-html -->
                        <div class="markdown-body vuepress-markdown-body github-markdown-body article-content" v-html="addTarget(articleData.html)" />
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

defineOptions({
    name: 'FrontendArticle',
})

const route = useRoute()
const id = $(useRouteParam('id'))
const path = route.fullPath

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const frontendArticleStore = useFrontendArticleStore()
const globalCommentStore = useGlobalCommentStore()

await useAsyncData(`frontend-article-detail-${id}`, () =>
    Promise.all([
        globalCommentStore.getCommentList({ id, path, page: 1, limit: 10 }),
        frontendArticleStore.getArticleItem({ id, path }),
    ]).then(() => true),
)
await useAsyncData('frontend-article-category', () => globalCategoryStore.getCategoryList({}).then(() => true))
await useAsyncData('frontend-article-trending', () => frontendArticleStore.getTrending().then(() => true))

const { lists: category } = $(storeToRefs(globalCategoryStore))
const { item, trending } = $(storeToRefs(frontendArticleStore))
const { lists: comments } = $(storeToRefs(globalCommentStore))

const isLoad = $computed(() => item.isLoad)
const articleData = $computed(() => item.data)

useAutoScroll(`frontend-article-detail-${id}`)

function addTarget(content: string) {
    if (!content) {
        return ''
    }
    return content.replace(/<a(.*?)href="http/g, '<a$1target="_blank" href="http')
}

const headTitle = computed(() => {
    let title = 'M.M.F 小屋'
    title = articleData?.title ? `${articleData.title} - M.M.F 小屋` : 'M.M.F 小屋'
    return title
})
useHead({
    // Can be static or computed
    title: headTitle,
    meta: [
        {
            name: 'description',
            content: headTitle,
        },
    ],
})
</script>
