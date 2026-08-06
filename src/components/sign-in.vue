<template>
    <div class="modal-wrap modal-sign-in-wrap" :class="show ? 'active' : ''">
        <span class="center-helper" />
        <div class="modal modal-signup">
            <h2 class="modal-title">登录</h2>
            <a href="javascript:;" class="modal-close" @click="handleClose"><i class="icon icon-close-black" /></a>
            <div class="modal-content">
                <form class="sign-up-form">
                    <div class="input-wrap">
                        <input v-model="body.username" type="text" placeholder="昵称" class="base-input" name="username">
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <div class="input-wrap">
                        <input v-model="body.password" type="password" placeholder="密码" class="base-input" autocomplete="off" name="password">
                        <p class="error-info input-info hidden">长度至少 6 位</p>
                    </div>
                    <a href="javascript:;" class="btn sign-up-btn btn-yellow" @click="handleLogin">确认登录</a>
                    <a href="javascript:;" class="btn sign-up-btn btn-blue block" @click="handleRegister">我要注册</a>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { UserCookies } from '@/types'

defineOptions({
    name: 'SignIn',
})

const props = defineProps<{
    show: boolean
}>()

const { show } = $(toRefs(props))

const globalStore = useGlobalStore()

const body = reactive({
    username: '',
    password: '',
})

function handleClose() {
    globalStore.setLoginModal(false)
}
function handleRegister() {
    globalStore.setLoginModal(false)
    globalStore.setRegisterModal(true)
}
/**
 * 登录成功后同步 Cookie 到 Pinia，并关闭弹窗
 */
const handleLogin = useLockFn(async () => {
    if (!body.username || !body.password) {
        return showMsg('请将表单填写完整!')
    }

    const { code, message, data } = await useHttp.$post<ResData<UserCookies>>('/api/frontend/user/login', {}, { body })
    if (code === 200) {
        showMsg({ type: 'success', content: message })

        const parsed = import.meta.client ? utilsParseCookies(document.cookie) : {}
        const nextCookies: UserCookies = {
            user: data?.user || parsed.user,
            userid: data?.userid || parsed.userid,
            username: data?.username || parsed.username,
            useremail: data?.useremail || parsed.useremail,
        }

        const userCookie = useCookie<string | null>('user')
        const useridCookie = useCookie<string | null>('userid')
        const usernameCookie = useCookie<string | null>('username')
        const useremailCookie = useCookie<string | null>('useremail')

        if (nextCookies.user) {
            userCookie.value = String(nextCookies.user)
        }
        if (nextCookies.userid) {
            useridCookie.value = String(nextCookies.userid)
        }
        if (nextCookies.username) {
            usernameCookie.value = String(nextCookies.username)
        }
        if (nextCookies.useremail) {
            useremailCookie.value = String(nextCookies.useremail)
        }

        globalStore.setCookies(nextCookies)
        useState('frontend-auth-checked', () => false).value = false
        useState('frontend-auth-valid', () => false).value = false
        globalStore.setLoginModal(false)
        body.username = ''
        body.password = ''
    }
})
</script>
