<template>
    <div class="main wrap">
        <div class="main-left">
            <NuxtPage />
        </div>
        <div class="main-right"><aside-account /></div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FrontendUser',
})
</script>
