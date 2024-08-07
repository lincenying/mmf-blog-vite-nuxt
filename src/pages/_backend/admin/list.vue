<template>
    <div class="card settings-main">
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
                    <router-link :to="`/_backend/admin/modify?id=${item._id}`" class="badge badge-success">编辑</router-link>
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
    name: 'BackendAdminList',
})

const route = useRoute()

// pinia 状态管理 ===>
const backendAdminStore = useBackendAdminStore()
await useAsyncData('backend-admin-list', () => backendAdminStore.getAdminList({ page: 1, path: route.fullPath }).then(() => true))
const { lists } = $(storeToRefs(backendAdminStore))

useAutoScroll('backend-admin-list')

const [loading, toggleLoading] = useToggle(false)

async function loadMore(page = lists.page) {
    if (loading.value) {
        return
    }
    toggleLoading(true)
    await backendAdminStore.getAdminList({ page, path: route.fullPath })
    toggleLoading(false)
}
async function handleRecover(id: string) {
    const { code, message } = await useHttp().$get<ResData<'success' | 'error'>>('/api/backend/admin/recover', {
        id,
    })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendAdminStore.recoverAdmin(id)
    }
}
async function handleDelete(id: string) {
    const { code, message } = await useHttp().$get<ResData<'success' | 'error'>>('/api/backend/admin/delete', {
        id,
    })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        backendAdminStore.deleteAdmin(id)
    }
}

const headTitle = ref('管理员列表 - M.M.F 小屋')
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
