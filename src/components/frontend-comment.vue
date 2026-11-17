<template>
    <div class="card">
        <div class="comments">
            <div class="comment-post-wrap">
                <img :src="useAvatar(userEmail)" alt="" class="avatar-img">
                <div class="comment-post-input-wrap base-textarea-wrap">
                    <textarea ref="contentRef" v-model="body.content" class="base-input textarea-input" cols="30" rows="4" />
                </div>
                <div class="comment-post-actions"><a href="javascript:;" class="btn btn-blue" @click="handlePostComment">发表评论</a></div>
            </div>
            <div class="comment-items-wrap">
                <div v-for="item in comments.data" :key="item._id" class="comment-item">
                    <a href="javascript:;" class="comment-author-avatar-link">
                        <img :src="useAvatar(item.userid?.email || item.email)" alt="" class="avatar-img">
                    </a>
                    <div class="comment-content-wrap">
                        <span class="comment-author-wrap">
                            <a href="javascript:;" class="comment-author">{{ item.userid?.username || item.username || '匿名' }}</a>
                        </span>
                        <div class="comment-content">{{ item.is_delete ? '该评论已删除' : item.content }}</div>
                        <div class="comment-footer">
                            <span class="comment-time">{{ item.creat_date }}</span>
                            <a v-if="!item.is_delete" href="javascript:;" class="comment-action-item comment-reply" @click="handleReply(item)">回复</a>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="comments.hasNext" class="load-more-wrap">
                <a v-if="!loading" href="javascript:;" class="comments-load-more" @click="handleLoadComment">加载更多</a>
                <a v-else href="javascript:;" class="comments-load-more">加载中...</a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Comment, CommentStoreList } from '@/types'
import { insertFrontendComment } from '@/api/frontend-comment'

defineOptions({
    name: 'FrontendComment',
})

const props = defineProps<{
    comments: CommentStoreList
}>()

const { comments } = $(toRefs(props))

const globalStore = useGlobalStore()
const { cookies } = $(toRefs(globalStore))

const globalCommentStore = useGlobalCommentStore()
const frontendArticleStore = useFrontendArticleStore()

const [loading, toggleLoading] = useToggle(false)
const contentRef = ref<HTMLTextAreaElement | null>(null)

const route = useRoute()
const articleId = useRouteParam('id', '')
const body = reactive({
    content: '',
})

const user = $computed(() => cookies.user)
const userEmail = $computed(() => cookies.useremail)

/**
 * 加载更多评论
 */
async function handleLoadComment() {
    toggleLoading(true)
    await globalCommentStore.getCommentList({
        id: articleId.value,
        path: route.fullPath,
        page: comments.page,
        limit: 10,
    })
    toggleLoading(false)
}
/**
 * 发表评论
 */
const handlePostComment = useLockFn(async () => {
    const content = body.content.trim()
    if (!user) {
        showMsg('请先登录!')
        globalStore.setLoginModal(true)
    }
    else if (!content) {
        showMsg('请输入评论内容!')
    }
    else if (!articleId.value) {
        showMsg('文章 ID 无效!')
    }
    else {
        const { code, data } = await insertFrontendComment({
            id: articleId.value,
            content,
        })
        if (code === 200 && data) {
            body.content = ''
            showMsg({ type: 'success', content: '评论发布成功!' })
            globalCommentStore.insertCommentItem(data)
            frontendArticleStore.increaseCommentCount(articleId.value)
        }
    }
})
/**
 * 回复评论并聚焦输入框
 * @param item 被回复的评论
 */
function handleReply(item: Comment) {
    const name = item.userid?.username || item.username || ''
    body.content = `回复 @${name}: `
    contentRef.value?.focus()
}
</script>
