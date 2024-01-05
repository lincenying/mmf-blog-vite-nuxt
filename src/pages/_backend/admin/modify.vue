<template>
    <div class="card settings-main">
        <div class="settings-main-content">
            <form>
                <a-input title="昵称">
                    <input v-model="form.username" type="text" placeholder="昵称" class="base-input" name="username">
                    <span class="input-info error">请输入昵称</span>
                </a-input>
                <a-input title="邮箱">
                    <input v-model="form.email" type="text" placeholder="邮箱" class="base-input" name="email">
                    <span class="input-info error">请输入邮箱</span>
                </a-input>
                <a-input title="密码">
                    <input v-model="form.password" type="password" placeholder="密码" class="base-input" name="password">
                    <span class="input-info error">请输入密码</span>
                </a-input>
            </form>
        </div>
        <div class="settings-footer">
            <a href="javascript:;" class="btn btn-yellow" @click="handleModify">编辑管理员</a>
            <router-link to="/_backend/admin/list" class="btn btn-blue">返回</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/types'

defineOptions({
    name: 'BackendAdminModify',
})

const router = useRouter()
const id = $(useRouteQuery('id'))

const backendAdminStore = useBackendAdminStore()
await useAsyncData('backend-article-modify', () => backendAdminStore.getAdminItem({ id }))
const { item } = $(storeToRefs(backendAdminStore))

const form = reactive({
    id,
    username: '',
    email: '',
    password: '',
})

watch(
    () => item,
    (val) => {
        if (val.data) {
            form.username = val.data.username
            form.email = val.data.email
        }
    },
    {
        deep: true,
        immediate: true,
    },
)

const [loading, toggleLoading] = useToggle(false)

async function handleModify() {
    if (!form.username || !form.email) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value)
        return
    toggleLoading(true)
    const { code, message, data } = await $fetch<ResData<User>>('/api/backend/admin/modify', {
        method: 'post',
        body: form,
    })
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendAdminStore.updateAdminItem(data)
        router.push('/_backend/admin/list')
    }
}

const headTitle = ref('编辑管理员 - M.M.F 小屋')
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
