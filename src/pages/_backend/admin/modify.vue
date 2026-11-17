<template>
    <div class="card settings-main">
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
            <a href="javascript:;" class="btn btn-yellow" @click="handleModify">编辑管理员</a>
            <NuxtLink to="/_backend/admin/list" class="btn btn-blue">返回</NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/types'

defineOptions({
    name: 'BackendAdminModify',
})

const route = useRoute()
const router = useRouter()
const id = $(useRouteQuery('id'))

const backendAdminStore = useBackendAdminStore()
const { item } = $(storeToRefs(backendAdminStore))

const body = reactive({
    id,
    username: '',
    email: '',
    password: '',
})

watch(
    () => item.data,
    (data) => {
        if (!data || data._id !== id) {
            return
        }
        body.id = data._id
        body.username = data.username
        body.email = data.email
    },
    {
        immediate: true,
    },
)

/**
 * 按当前管理员 ID 拉取详情
 */
async function loadAdminForm() {
    if (item.data?._id !== id) {
        body.id = id
        body.username = ''
        body.email = ''
        body.password = ''
    }
    await backendAdminStore.getAdminItem({ id, path: route.fullPath })
}

await useRouteData(
    `backend-admin-modify-${id}`,
    () => item.data?._id === id,
    loadAdminForm,
    () => route.path.startsWith('/_backend/admin/modify'),
)

const [loading, toggleLoading] = useToggle(false)

async function handleModify() {
    if (!body.username || !body.email) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value) {
        return
    }
    toggleLoading(true)
    const { code, message, data } = await useHttp.$post<ResData<User>>('/api/backend/admin/modify', {}, { body })
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
