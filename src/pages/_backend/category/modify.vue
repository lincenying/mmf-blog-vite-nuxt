<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="分类名称">
                <input v-model="body.cate_name" type="text" placeholder="分类名称" class="base-input" name="cate_name">
                <span class="input-info error">请输入分类名称</span>
            </a-input>
            <a-input title="分类排序">
                <input v-model="body.cate_order" type="text" placeholder="分类排序" class="base-input" name="cate_order">
                <span class="input-info error">请输入分类排序</span>
            </a-input>
        </div>
        <div class="settings-footer">
            <a href="javascript:;" class="btn btn-yellow" @click="handleModify">编辑分类</a>
            <router-link to="/_backend/category/list" class="btn btn-blue">返回</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Category } from '@/types'

defineOptions({
    name: 'BackendCategoryModify',
})

const route = useRoute()
const router = useRouter()
const id = $(useRouteQuery('id'))

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
await useAsyncData('backend-category-list', () => globalCategoryStore.getCategoryItem({ path: route.fullPath, id }).then(() => true))
const { item } = $(storeToRefs(globalCategoryStore))

const [loading, toggleLoading] = useToggle(false)

const body = reactive({
    id,
    cate_name: '',
    cate_order: '',
})

watch(
    item,
    (val) => {
        if (val.data) {
            body.cate_name = val.data.cate_name
            body.cate_order = val.data.cate_order
        }
    },
    {
        immediate: true,
        deep: true,
    },
)

async function handleModify() {
    if (!body.cate_name || !body.cate_order) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value) {
        return
    }
    toggleLoading(true)
    const { code, data, message } = await useHttp().$post<ResData<Category>>('/api/backend/category/modify', {}, { body })
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCategoryStore.updateCategoryItem(data)
        router.push('/_backend/category/list')
    }
}

const headTitle = ref('编辑分类 - M.M.F 小屋')
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
