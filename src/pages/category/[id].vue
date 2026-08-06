<template>
    <topics-list :topics="topics" :loading="loading" page-type="category" :category-id="id" @load-more="loadMore"></topics-list>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FrontendIndexCategory',
})

const route = useRoute()
const id = $(useRouteParam('id'))

// pinia 状态管理 ===>
const frontendArticleStore = useFrontendArticleStore()

const { category: topics } = $(storeToRefs(frontendArticleStore))

/**
 * 组装分类列表请求参数
 */
function getConfig(page = 1) {
    const path = route.path
    const id = $(useRouteParam('id'))
    return {
        page,
        limit: 10,
        path,
        id,
    }
}

watch(
    () => route.path,
    () => {
        frontendArticleStore.getArticleList(getConfig(), 'category')
    },
)

await callOnce(`frontend-index-category-${id}`, () => frontendArticleStore.getArticleList(getConfig(), 'category').then(() => true))

useAutoScroll(`frontend-index-category-${id}`)

const [loading, toggleLoading] = useToggle(false)
/**
 * 加载更多分类文章
 */
async function loadMore(page = topics.page) {
    if (loading.value) {
        return
    }
    toggleLoading(true)
    await frontendArticleStore.getArticleList(getConfig(page), 'category')
    toggleLoading(false)
}

definePageMeta({
    key: 'frontend-index-category',
    layout: 'default',
    keepalive: true,
})
</script>
