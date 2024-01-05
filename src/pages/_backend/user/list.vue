<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-username">用户名</div>
                <div class="list-email">邮箱</div>
                <div class="list-date">时间</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in lists.data" :key="item._id" class="list-section">
                <div class="list-username" :class="item.is_delete ? 'text-red-500 line-through' : ''">{{ item.username }}</div>
                <div class="list-email">{{ item.email }}</div>
                <div class="list-date">{{ UTC2Date(item.update_date) }}</div>
                <div class="list-action">
                    <router-link :to="`/_backend/user/modify?id=${item._id}`" class="badge badge-success">编辑</router-link>
                    <a v-if="item.is_delete" href="javascript:;" @click="handleRecover(item._id)">恢复</a>
                    <a v-else href="javascript:;" @click="handleDelete(item._id)">删除</a>
                </div>
            </div>
        </div>
        <div v-if="lists.hasNext" class="settings-footer">
            <a v-if="!loading" class="admin-load-more" href="javascript:;" @click="loadMore()">加载更多</a>
            <a v-else class="admin-load-more" href="javascript:;">加载中...</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { UTC2Date } from '@lincy/utils'

defineOptions({
    name: 'BackendUserList',
})

const route = useRoute()

// pinia 状态管理 ===>
const backendUserStore = useBackendUserStore()
await useAsyncData('backend-user-list', () => backendUserStore.getUserList({ page: 1, path: route.fullPath }))
const { lists } = $(storeToRefs(backendUserStore))

useAutoScroll('backend-user-list')

const [loading, toggleLoading] = useToggle(false)

async function loadMore(page = lists.page) {
    if (loading.value)
        return
    toggleLoading(true)
    await backendUserStore.getUserList({ page, path: route.fullPath })
    toggleLoading(false)
}
async function handleRecover(id: string) {
    const { code, message } = await $fetch<ResData<'success' | 'error'>>('/api/backend/user/recover', {
        query: { id },
    })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendUserStore.recoverUser(id)
    }
}
async function handleDelete(id: string) {
    const { code, message } = await $fetch<ResData<'success' | 'error'>>('/api/backend/user/delete', {
        query: { id },
    })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendUserStore.deleteUser(id)
    }
}

const headTitle = ref('用户列表 - M.M.F 小屋')
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
