<template>
    <div class="card settings-main">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-title">分类名称</div>
                <div class="list-date">分类排序</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in category" :key="item._id" class="list-section">
                <div class="list-title" :class="item.is_delete ? 'text-red-500 line-through' : ''">{{ item.cate_name }}</div>
                <div class="list-date">{{ item.cate_order }}</div>
                <div class="list-action">
                    <router-link :to="`/_backend/category/modify?id=${item._id}`" class="badge badge-success">编辑</router-link>
                    <template v-if="!item.cate_num">
                        <a v-if="item.is_delete" href="javascript:;" @click="handleRecover(item._id)">恢复</a>
                        <a v-else href="javascript:;" @click="handleDelete(item._id)">删除</a>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BackendCategoryList',
})

const route = useRoute()

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
await useAsyncData('backend-category-list', () => globalCategoryStore.getCategoryList({ limit: 99, path: route.fullPath }))
const { lists: category } = $(storeToRefs(globalCategoryStore))

useAutoScroll('backend-category-list')

async function handleRecover(id: string) {
    const { code, message } = await useHttp().$get<ResData<'success' | 'error'>>('/api/backend/category/recover', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCategoryStore.recoverCategory(id)
    }
}

async function handleDelete(id: string) {
    const { code, message } = await useHttp().$get<ResData<'success' | 'error'>>('/api/backend/category/delete', { id })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCategoryStore.deleteCategory(id)
    }
}

const headTitle = ref('分类列表 - M.M.F 小屋')
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
