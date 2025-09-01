<template>
    <div class="home-feeds cards-wrap">
        <div class="settings-main card">
            <div class="settings-main-content">
                <form>
                    <a-input title="当前密码">
                        <input
                            v-model="body.old_password"
                            type="password"
                            placeholder="当前密码"
                            class="base-input"
                            name="old_password"
                            autocomplete="off"
                        >
                    </a-input>
                    <a-input title="新的密码">
                        <input v-model="body.password" type="password" placeholder="新的密码" class="base-input" name="password" autocomplete="off">
                    </a-input>
                    <a-input title="确认密码">
                        <input
                            v-model="body.re_password"
                            type="password"
                            placeholder="确认密码"
                            class="base-input"
                            name="re_password"
                            autocomplete="off"
                        >
                    </a-input>
                </form>
            </div>
            <div class="settings-footer"><a href="javascript:;" class="btn btn-yellow" @click="handleSubmit">保存设置</a></div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'FrontendUserPassword',
})

const body = reactive({
    old_password: '',
    password: '',
    re_password: '',
})

const handleSubmit = useLockFn(async () => {
    if (!body.password || !body.old_password || !body.re_password) {
        return showMsg('请将表单填写完整!')
    }
    else if (body.password !== body.re_password) {
        return showMsg('两次密码输入不一致!')
    }

    const { code, message } = await useHttp.$post<ResData<'success' | 'error'>>('/api/frontend/user/password', {}, { body })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        body.old_password = ''
        body.password = ''
        body.re_password = ''
    }
})

const headTitle = ref('密码 - M.M.F 小屋')

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
    middleware: ['frontend-auth'],
})
</script>
