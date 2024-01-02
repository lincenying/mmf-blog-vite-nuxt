<template>
    <topics-list :topics="topics" :loading="loading" page-type="category" :category-id="id" @load-more="loadMore"></topics-list>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FrontendIndexCategory',
})

const route = useRoute()
const id = useRouteParam('id')

// pinia 状态管理 ===>
const frontendArticleStore = useFrontendArticleStore()

const { category: topics } = $(storeToRefs(frontendArticleStore))

function getConfig(page = 1) {
    const path = route.path
    const id = useRouteParam('id').value
    return {
        page, limit: 10, path, id,
    }
}

watch(() => route.path, () => {
    frontendArticleStore.getArticleList(getConfig(), 'category')
})

await useAsyncData('frontend-index', () => frontendArticleStore.getArticleList(getConfig(), 'category'))

useAutoScroll('frontend-index-category')

const [loading, toggleLoading] = useToggle(false)
async function loadMore(page = topics.page) {
    if (loading.value)
        return
    toggleLoading(true)
    await frontendArticleStore.getArticleList(getConfig(page))
    toggleLoading(false)
}

definePageMeta({
    key: 'frontend-index-category',
    layout: 'default',
    keepalive: true,
})
</script>
