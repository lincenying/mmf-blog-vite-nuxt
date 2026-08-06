<template>
    <topics-list :topics="topics" :loading="loading" page-type="visit" @load-more="loadMore"></topics-list>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FrontendIndexVisit',
})

const route = useRoute()
const by = $(useRouteParam('by'))

// pinia 状态管理 ===>
const frontendArticleStore = useFrontendArticleStore()

const { visit: topics } = $(storeToRefs(frontendArticleStore))

/**
 * 组装热门/访问量列表请求参数
 */
function getConfig(page = 1) {
    const path = route.path
    const by = $(useRouteParam('by'))
    return {
        page,
        limit: 10,
        path,
        by,
    }
}

watch(
    () => route.path,
    () => {
        frontendArticleStore.getArticleList(getConfig(), 'visit')
    },
)

await callOnce(`frontend-index-visit-${by}`, () => frontendArticleStore.getArticleList(getConfig(), 'visit').then(() => true))

useAutoScroll(`frontend-index-visit-${by}`)

const [loading, toggleLoading] = useToggle(false)
/**
 * 加载更多热门列表
 */
async function loadMore(page = topics.page) {
    if (loading.value) {
        return
    }
    toggleLoading(true)
    await frontendArticleStore.getArticleList(getConfig(page), 'visit')
    toggleLoading(false)
}

definePageMeta({
    key: 'frontend-index-visit',
    layout: 'default',
    keepalive: true,
})
</script>
