<template>
    <topics-list :topics="topics" :loading="loading" page-type="search" :search-key="key" @load-more="loadMore"></topics-list>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FrontendIndexSearch',
})

const route = useRoute()
const key = $(useRouteParam('key'))

// pinia 状态管理 ===>
const frontendArticleStore = useFrontendArticleStore()

const { search: topics } = $(storeToRefs(frontendArticleStore))

function getConfig(page = 1) {
    const path = route.path
    const key = $(useRouteParam('key'))
    return {
        page, limit: 10, path, key,
    }
}

await useAsyncData('frontend-index-search', () => frontendArticleStore.getArticleList(getConfig(), 'search').then(() => true))

useAutoScroll('frontend-index-search')

const [loading, toggleLoading] = useToggle(false)
async function loadMore(page = topics.page) {
    if (loading.value) {
        return
    }
    toggleLoading(true)
    await frontendArticleStore.getArticleList(getConfig(page))
    toggleLoading(false)
}

definePageMeta({
    key: 'frontend-index-search',
    layout: 'default',
    keepalive: true,
})
</script>
