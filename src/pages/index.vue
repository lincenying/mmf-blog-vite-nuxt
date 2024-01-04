<template>
    <topics-list :topics="topics" :loading="loading" page-type="lists" @load-more="loadMore"></topics-list>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FrontendIndex',
})

const route = useRoute()

// pinia 状态管理 ===>
const frontendArticleStore = useFrontendArticleStore()

await useAsyncData('frontend-index', () => frontendArticleStore.getArticleList(getConfig(), 'lists'))

const { lists: topics } = $(storeToRefs(frontendArticleStore))

function getConfig(page = 1) {
    const path = route.path
    return {
        page, limit: 10, path,
    }
}

useAutoScroll('frontend-index')

const [loading, toggleLoading] = useToggle(false)
async function loadMore(page: number) {
    console.log(page)
    if (loading.value)
        return
    toggleLoading(true)
    await frontendArticleStore.getArticleList(getConfig(page))
    toggleLoading(false)
}

definePageMeta({
    key: 'frontend-index',
    layout: 'default',
    keepalive: true,
})
</script>
