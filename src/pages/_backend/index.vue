<template>
    <div class="wrap main">
        <div class="main-left">
            <div class="cards-wrap home-feeds">
                <NuxtChild class="app-view"></NuxtChild>
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

const key = computed(() => route.path.replace(/\//g, '_'))

const isLogin = computed(() => ['/backend/login', '/backend/login/'].includes(route.path))
</script>
