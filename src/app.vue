<template>
    <VitePwaManifest />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { appName } from '~/constants'

import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import 'vue-loading-overlay/dist/css/index.css'
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
import './assets/css/hljs/googlecode.css'
import './assets/scss/style.scss'

useHead({
    title: appName,
})
</script>
