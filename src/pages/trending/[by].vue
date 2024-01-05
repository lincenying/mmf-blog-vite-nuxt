<template>
    <topics-list :topics="topics" :loading="loading" page-type="visit" @load-more="loadMore"></topics-list>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FrontendIndexVisit',
})

const route = useRoute()

// pinia 状态管理 ===>
const frontendArticleStore = useFrontendArticleStore()

const { visit: topics } = $(storeToRefs(frontendArticleStore))

function getConfig(page = 1) {
    const path = route.path
    const by = $(useRouteParam('by'))
    return {
        page, limit: 10, path, by,
    }
}

await useAsyncData('frontend-index-visit', () => frontendArticleStore.getArticleList(getConfig(), 'visit'))

useAutoScroll('frontend-index-visit')

const [loading, toggleLoading] = useToggle(false)
async function loadMore(page = topics.page) {
    if (loading.value)
        return
    toggleLoading(true)
    await frontendArticleStore.getArticleList(getConfig(page))
    toggleLoading(false)
}

definePageMeta({
    key: 'frontend-index-visit',
    layout: 'default',
    keepalive: true,
})
</script>
