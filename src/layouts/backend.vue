<template>
    <div class="backend">
        <global-navigation :is-backend="true" />
        <slot />
        <sign-in :show="showLoginModal" />
        <sign-up :show="showRegisterModal" />
        <back-top />
        <client-only>
            <bg-plum />
            <reload-prompt />
        </client-only>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'AppRoot',
})

// pinia 状态管理 ===>
const globalStore = useGlobalStore()
const { showLoginModal, showRegisterModal } = toRefs(globalStore)
</script>
