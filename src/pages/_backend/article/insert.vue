<template>
    <div class="settings-main card">
        <div class="settings-main-content">
            <a-input title="标题">
                <input v-model="body.title" type="text" placeholder="标题" class="base-input" name="title">
                <span class="input-info error">请输入标题</span>
            </a-input>
            <a-input title="分类" classes="select-item-wrap">
                <i class="icon icon-arrow-down" />
                <select v-model="body.category" class="select-item" name="category">
                    <option value="">请选择分类</option>
                    <option v-for="item in lists" :key="item._id" :value="`${item._id}|${item.cate_name}`">{{ item.cate_name }}</option>
                </select>
                <span class="input-info error">请输入分类</span>
            </a-input>
            <div class="settings-section">
                <div id="post-content" class="settings-item-content">
                    <client-only>
                        <v-md-editor
                            v-if="editorReady"
                            v-model="body.content"
                            :disabled-menus="[]"
                            mode="edit"
                            height="500px"
                            left-toolbar="undo redo clear | h bold italic strikethrough link | ul ol table hr | image quote code tip | save"
                            @upload-image="handleUploadImage"
                        />
                    </client-only>
                </div>
            </div>
        </div>
        <div class="settings-footer">
            <label mr-10px inline-flex items-center>
                <input v-model="frontHtml" type="checkbox" value="1">
                <span ml-5px>使用前端生成Html?</span>
            </label>
            <a href="javascript:;" class="btn btn-yellow" @click="handleInsert">添加文章</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AnyFn } from '@vueuse/core'
import type { Article, Upload } from '@/types'

defineOptions({
    name: 'BackendArticleInsert',
})

const $loading = useLoading()
const route = useRoute()
const router = useRouter()
const nuxtApp = useNuxtApp()
const uploadApi = useUploadApi()

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()

await callOnce('backend-article-insert-categories', () =>
    globalCategoryStore
        .getCategoryList({
            limit: 99,
            path: route.fullPath,
        })
        .then(() => true),
)

const { lists } = $(storeToRefs(globalCategoryStore))

const { data: posts } = useNuxtData<ResData<ResDataLists<Article>>>('backend-article-list')

const editorReady = ref(false)
const frontHtml = ref(true)
const [loading, toggleLoading] = useToggle(false)

const body = reactive({
    title: '',
    category: '',
    content: '',
    html: '',
})

onMounted(async () => {
    await ensureMarkdownEditor(nuxtApp.vueApp)
    editorReady.value = true
})

/**
 * 发布文章
 */
async function handleInsert() {
    if (!body.title || !body.category || !body.content) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value) {
        return
    }
    toggleLoading(true)
    if (frontHtml.value) {
        const MarkdownEditor = await ensureMarkdownEditor(nuxtApp.vueApp)
        body.html = MarkdownEditor.vMdParser.themeConfig.markdownParser.render(body.content)
    }
    const { code, data, message } = await useHttp.$post<ResData<Article>>('/api/backend/article/insert', {}, { body })
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        posts.value?.data.list.push(data)
        router.push('/_backend/article/list')
    }
}

/**
 * 上传图片并插入编辑器
 */
async function handleUploadImage(_event: EventTarget, insertImage: AnyFn, files: FileList) {
    const loader = $loading.show()

    const formData = new FormData()
    formData.append('file', files[0]!)
    try {
        const { data } = await useHttp.$post<ResData<Upload>>(`${uploadApi.value}/api/fetch/upload`, {}, { body: formData })
        if (data && data.filepath) {
            insertImage({
                url: `${uploadApi.value}/${data.filepath}`,
                desc: '',
            })
        }
    }
    catch {
        showMsg('图片上传失败')
    }

    loader.hide()
}

useSeoMeta({
    title: '发布文章 - M.M.F 小屋',
    description: '后台发布文章',
})

definePageMeta({
    middleware: ['backend-auth'],
})
</script>
