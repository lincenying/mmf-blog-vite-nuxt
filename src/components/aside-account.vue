<template>
    <div class="card card-me">
        <router-link to="/user/account" active-class="active" class="side-entry">
            <i class="icon icon-arrow-right" /><i class="icon icon-menu-articles" />帐号
        </router-link>
        <router-link to="/user/password" active-class="active" class="side-entry">
            <i class="icon icon-arrow-right" /><i class="icon icon-menu-articles" />密码
        </router-link>
        <a href="javascript:;" class="side-entry" @click="handleLogout">
            <i class="icon icon-arrow-right" /><i class="icon icon-menu-articles" />退出
        </a>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'AsideAccount',
})

async function handleLogout() {
    await useHttp.$post('/api/frontend/user/logout')
    useCookie('user').value = null
    useCookie('userid').value = null
    useCookie('username').value = null
    useCookie('useremail').value = null
    useState('frontend-auth-checked', () => false).value = false
    useState('frontend-auth-valid', () => false).value = false
    useGlobalStore().setCookies({})
    await navigateTo('/')
}
</script>
