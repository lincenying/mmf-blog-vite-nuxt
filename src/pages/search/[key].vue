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

/**
 * 组装搜索列表请求参数
 */
function getConfig(page = 1) {
    const path = route.path
    const key = $(useRouteParam('key'))
    return {
        page,
        limit: 10,
        path,
        key,
    }
}

watch(
    () => route.path,
    () => {
        frontendArticleStore.getArticleList(getConfig(), 'search')
    },
)

await callOnce(`frontend-index-search-${key}`, () => frontendArticleStore.getArticleList(getConfig(), 'search').then(() => true))

useAutoScroll(`frontend-index-search-${key}`)

const [loading, toggleLoading] = useToggle(false)
/**
 * 加载更多搜索结果
 */
async function loadMore(page = topics.page) {
    if (loading.value) {
        return
    }
    toggleLoading(true)
    await frontendArticleStore.getArticleList(getConfig(page), 'search')
    toggleLoading(false)
}

definePageMeta({
    key: 'frontend-index-search',
    layout: 'default',
    keepalive: true,
})
</script>
