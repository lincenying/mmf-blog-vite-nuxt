<template>
    <VitePwaManifest />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { appName } from '~/constants'

import './assets/css/github-markdown.css'
import './assets/css/hljs/googlecode.css'
import 'vue-loading-overlay/dist/css/index.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import './assets/scss/style.scss'

useHead({
    title: appName,
})
</script>
