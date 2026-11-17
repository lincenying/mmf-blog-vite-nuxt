<template>
    <div class="cards-wrap home-feeds">
        <div class="card settings-main">
            <div class="settings-main-content">
                <form>
                    <a-input title="昵称">
                        <input type="text" :value="username" placeholder="昵称" class="base-input" name="username" readonly>
                        <span class="input-info error">请输入昵称</span>
                    </a-input>
                    <a-input title="邮箱">
                        <input v-model="email" type="text" placeholder="邮箱" class="base-input" name="email">
                        <span class="input-info error">请输入邮箱</span>
                    </a-input>
                </form>
            </div>
            <div class="settings-footer">
                <a href="javascript:;" class="btn btn-yellow" @click="handleSubmit">保存设置</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/types'
import { isEmail } from '@lincy/utils'

defineOptions({
    name: 'FrontendUserAccount',
})

const globalStore = useGlobalStore()

// pinia 状态管理 ===>
const { cookies } = $(toRefs(globalStore))
const useremailCookie = useCookie<string | null>('useremail')

let username = $ref('')
let email = $ref('')

const { data: accountRes } = await useAsyncData('frontend-user-account', () =>
    useHttp.$get<ResData<User>>('/api/frontend/user/account'),
)

if (accountRes.value?.code === 200 && accountRes.value.data) {
    username = accountRes.value.data.username
    email = accountRes.value.data.email
}

const handleSubmit = useLockFn(async () => {
    if (!email) {
        showMsg('请填写邮箱地址!')
        return
    }
    else if (!isEmail(email)) {
        showMsg('邮箱格式错误!')
        return
    }

    const payload = {
        email,
        username,
        id: cookies.userid,
    }
    const { code, message } = await useHttp.$post<ResData<unknown>>('/api/frontend/user/account', {}, { body: payload })
    if (code === 200) {
        useremailCookie.value = email
        if (accountRes.value?.code === 200 && accountRes.value.data) {
            accountRes.value = {
                ...accountRes.value,
                data: {
                    ...accountRes.value.data,
                    email,
                },
            }
        }
        globalStore.setCookies({
            ...cookies,
            useremail: email,
        })
        showMsg({ type: 'success', content: message })
    }
})

const headTitle = ref('帐号 - M.M.F 小屋')

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
