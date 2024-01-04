<template>
    <div class="wrap main">
        <div class="main-left">
            <div class="cards-wrap home-feeds">
                <NuxtPage class="app-view"></NuxtPage>
            </div>
        </div>
        <backend-menu v-if="!isLogin" />
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BackendIndex',
})

const route = useRoute()

// const key = computed(() => route.path.replace(/\//g, '_'))

const isLogin = computed(() => ['/_backend/login', '/_backend/login/'].includes(route.path))

definePageMeta({
    key: 'backend-index',
    layout: 'backend',
})
</script>
