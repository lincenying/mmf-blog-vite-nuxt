<template>
    <div class="card">
        <div class="comments">
            <div class="comment-back">
                <NuxtLink to="/_backend/article/list" class="btn btn-blue">返回</NuxtLink>
            </div>
            <div class="comment-items-wrap">
                <div v-for="item in lists.data" :key="item._id" class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img :src="useAvatar(item.email)" alt="" class="avatar-img">
                    </a>
                    <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.username }}</a>
                        </span>
                        <div class="comment-content">{{ item.content }}</div>
                        <div class="comment-footer">
                            <span class="comment-time">{{ getDateDiff(`${item.timestamp}`) }}</span>
                            <a v-if="item.is_delete" href="javascript:;" class="comment-action-item comment-reply" @click="handleRecover(item._id)">恢复</a>
                            <a v-else href="javascript:;" class="comment-action-item comment-reply" @click="handleDelete(item._id)">删除</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="lists.hasNext" class="load-more-wrap">
                <a v-if="!loading" href="javascript:;" class="comments-load-more" @click="loadMore()">加载更多</a>
                <a v-else href="javascript:;" class="comments-load-more">加载中...</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getDateDiff } from '@lincy/utils'

defineOptions({
    name: 'BackendArticleComment',
})

const route = useRoute()
const id = $(useRouteQuery('id'))

// pinia 状态管理 ===>
const globalCommentStore = useGlobalCommentStore()
const { lists } = $(storeToRefs(globalCommentStore))

/**
 * 按当前文章拉取评论
 */
async function loadComments() {
    await globalCommentStore.getCommentList({
        page: 1,
        path: route.fullPath,
        all: 1,
        id,
    })
}

await useRouteData(
    `backend-article-comment-${id}`,
    () => lists.path === route.fullPath,
    loadComments,
    () => route.path.startsWith('/_backend/article/comment'),
)

const [loading, toggleLoading] = useToggle(false)

/**
 * 加载更多评论
 */
async function loadMore() {
    if (loading.value) {
        return
    }
    toggleLoading(true)
    await globalCommentStore.getCommentList({
        page: lists.page,
        path: route.fullPath,
        all: 1,
        id,
    })
    toggleLoading(false)
}
async function handleRecover(id: string) {
    const { code, message } = await useHttp.$get<ResData<'success' | 'error'>>('/api/frontend/comment/recover', {
        id,
    })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCommentStore.recoverComment(id)
    }
}
async function handleDelete(id: string) {
    const { code, message } = await useHttp.$get<ResData<'success' | 'error'>>('/api/frontend/comment/delete', {
        id,
    })
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        globalCommentStore.deleteComment(id)
    }
}

const headTitle = ref('评论列表 - M.M.F 小屋')
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
