<template>
    <div class="frontend">
        <global-navigation :is-backend="false" />
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
    name: 'AppRootDefault',
})

// pinia 状态管理 ===>
const globalStore = useGlobalStore()
const { showLoginModal, showRegisterModal } = toRefs(globalStore)
</script>
