<template>
    <div class="wrap main">
        <div class="main-left">
            <div class="card card-answer">
                <div class="answer-content">
                    <div class="flex justify-center py-40px">
                        <img src="/static/images/error_1.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="main-right"><aside-trending :trending="trending" /></div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: '404Page',
})

const frontendArticleStore = useFrontendArticleStore()

await useAsyncData('404', () => frontendArticleStore.getTrending())

const { trending } = $(storeToRefs(frontendArticleStore))

const headTitle = ref('Page Not Found - M.M.F 小屋')
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
