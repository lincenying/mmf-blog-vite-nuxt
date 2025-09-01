<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <form>
                <a-input title="账号">
                    <input v-model="body.username" type="text" placeholder="请输入管理员账号" class="base-input" name="username">
                    <span class="input-info error">请输入昵称</span>
                </a-input>
                <a-input title="密码">
                    <input v-model="body.password" type="password" placeholder="请输入管理员密码" class="base-input" name="password">
                    <span class="input-info error">请输入密码</span>
                </a-input>
            </form>
        </div>
        <div class="settings-footer"><a href="javascript:;" class="btn btn-yellow" @click="handleLogin">登录</a></div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BackendLogin',
})

const router = useRouter()
const $loading = useLoading()

const body = reactive({
    username: '',
    password: '',
})

const handleLogin = useLockFn(async () => {
    if (!body.username || !body.password) {
        return showMsg('请输入用户名和密码!')
    }

    const loader = $loading.show()
    const { code, data } = await useHttp.$post<ResData<Nullable<string>>>('/api/backend/admin/login', {}, { body })
    loader.hide()
    if (code === 200 && data) {
        router.push('/_backend/article/list')
    }
})

onMounted(() => {
    const backendUser = useCookie<string>('b_user')
    if (backendUser.value) {
        router.push('/_backend/article/list')
    }
})

const headTitle = ref('管理员登录 - M.M.F 小屋')
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
</script>
