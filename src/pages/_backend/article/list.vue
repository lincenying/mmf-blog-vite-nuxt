<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <div class="list-section list-header">
                <div class="list-title">标题</div>
                <div class="list-category">分类</div>
                <div class="list-date">最后更新</div>
                <div class="list-action">操作</div>
            </div>
            <div v-for="item in lists" :key="item._id" class="list-section">
                <div class="list-title" :class="item.is_delete ? 'text-red-500 line-through' : ''">{{ item.title }}</div>
                <div class="list-category">{{ item.category_name }}</div>
                <div class="list-date">{{ getDateDiff(item.update_date) }}</div>
                <div class="list-action">
                    <router-link :to="`/_backend/article/modify/${item._id}`" class="badge badge-success">编辑</router-link>
                    <a v-if="item.is_delete" href="javascript:;" @click="handleRecover(item._id)">恢复</a>
                    <a v-else href="javascript:;" @click="handleDelete(item._id)">删除</a>
                    <router-link v-if="item.comment_count > 0" :to="`/_backend/article/comment/${item._id}`" class="badge badge-success">
                        评论
                    </router-link>
                </div>
            </div>
        </div>
        <div v-if="hasNext" class="settings-footer" flex-cc gap-30px>
            <a v-if="hasPrev" class="admin-load-more" href="javascript:;" @click="handlePrev">上一页</a>
            <a v-if="hasNext" class="admin-load-more" href="javascript:;" @click="handleNext">下一页</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getDateDiff } from '@lincy/utils'
import type { Article } from '@/types'

defineOptions({
    name: 'BackendArticleList',
})

const lists = ref<Article[]>([])
const page = ref(1)
let hasPrev = $ref(false)
let hasNext = $ref(false)

const { data, pending, refresh } = await useFetch<ResData<ResDataLists<Article>>>('/api/backend/article/list', {
    key: `backend-article-list`,
    params: {
        page,
        limit: 15,
    },
    headers: useRequestHeaders(['cookie']),
})

watch(() => data.value, async (newData) => {
    if (newData?.code === 200) {
        lists.value = newData.data.list || []
        hasPrev = !!newData.data.hasPrev
        hasNext = !!newData.data.hasNext
    }
    else {
        await navigateTo('/_backend/login')
    }
}, {
    immediate: true,
})

function handlePrev() {
    if (pending.value)
        return
    page.value = page.value - 1
}
function handleNext() {
    if (pending.value)
        return
    page.value = page.value + 1
}

async function handleRecover(id: string) {
    const { code, message } = await $fetch<ResData<Nullable<Article>>>('/api/backend/article/recover', {
        query: { id },
    })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        refresh()
    }
}
async function handleDelete(id: string) {
    const { code, message } = await $fetch<ResData<Nullable<Article>>>('/api/backend/article/delete', {
        query: { id },
    })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        refresh()
    }
}

const headTitle = ref('文章列表 - M.M.F 小屋')
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
