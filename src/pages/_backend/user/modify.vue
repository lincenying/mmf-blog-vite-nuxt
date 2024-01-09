<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <form>
                <a-input title="昵称">
                    <input v-model="body.username" type="text" placeholder="昵称" class="base-input" name="username">
                    <span class="input-info error">请输入昵称</span>
                </a-input>
                <a-input title="邮箱">
                    <input v-model="body.email" type="text" placeholder="邮箱" class="base-input" name="email">
                    <span class="input-info error">请输入邮箱</span>
                </a-input>
                <a-input title="密码">
                    <input v-model="body.password" type="password" placeholder="密码" class="base-input" name="password">
                    <span class="input-info error">请输入密码</span>
                </a-input>
            </form>
        </div>
        <div class="settings-footer">
            <a href="javascript:;" class="btn btn-yellow" @click="handleModify">编辑用户</a>
            <router-link to="/_backend/user/list" class="btn btn-blue">返回</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/types'

defineOptions({
    name: 'BackendUserModify',
})

const route = useRoute()
const router = useRouter()
const id = $(useRouteQuery('id'))

// pinia 状态管理 ===>
const backendUserStore = useBackendUserStore()
await useAsyncData('backend-user-modify', () => backendUserStore.getUserItem({
    id,
    path: route.fullPath,
    from: 'backend',
}))
const { item } = $(storeToRefs(backendUserStore))

const [loading, toggleLoading] = useToggle(false)

const body = reactive({
    id,
    username: '',
    email: '',
    password: '',
})

watch(item, (val) => {
    if (val.data) {
        body.username = val.data.username
        body.email = val.data.email
    }
}, {
    immediate: true,
    deep: true,
})

async function handleModify() {
    if (!body.username || !body.email) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value)
        return
    toggleLoading(true)
    const { code, data, message } = await useHttp().$post<ResData<User>>('/api/backend/user/modify', {}, { body })
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendUserStore.updateUserItem(data)
        router.push('/_backend/user/list')
    }
}

const headTitle = ref('用户编辑 - M.M.F 小屋')
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

definePageMeta({
    middleware: ['backend-auth'],
})
</script>
