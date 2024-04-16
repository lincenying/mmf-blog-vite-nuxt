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
                            v-if="isClient"
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
import { uploadApi } from '~/config'
import { MarkdownEditor } from '~/plugins/md-editor'

defineOptions({
    name: 'BackendArticleInsert',
})

const $loading = useLoading()
const route = useRoute()
const router = useRouter()

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()

await useAsyncData('frontend-insert', () => globalCategoryStore.getCategoryList({
    limit: 99,
    path: route.fullPath,
}))

const { lists } = $(storeToRefs(globalCategoryStore))

const { data: posts } = useNuxtData<ResData<ResDataLists<Article>>>('backend-article-list')

let isClient = $ref(false)
const frontHtml = ref(true)

const [loading, toggleLoading] = useToggle(false)

const body = reactive({
    title: '',
    category: '',
    content: '',
    html: '',
})

onMounted(async () => {
    isClient = true
})

async function handleInsert() {
    if (!body.title || !body.category || !body.content) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value) {
        return
    }
    toggleLoading(true)
    // body.html = this.$refs.md.d_render
    if (frontHtml.value) {
        const html = MarkdownEditor.vMdParser.themeConfig.markdownParser.render(body.content)
        body.html = html
    }
    const { code, data, message } = await useHttp().$post<ResData<Article>>('/api/backend/article/insert', {}, { body })
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: message })
        posts.value?.data.list.push(data)
        router.push('/_backend/article/list')
    }
}

async function handleUploadImage(event: EventTarget, insertImage: AnyFn, files: FileList) {
    const loader = $loading.show()

    const formData = new FormData()
    formData.append('file', files[0])
    try {
        const { data } = await useHttp().$post<ResData<Upload>>(`${uploadApi}/api/fetch/upload`, {}, { body: formData })
        if (data && data.filepath) {
            insertImage({
                url: `${uploadApi}/${data.filepath}`,
                desc: '',
                // width: 'auto',
                // height: 'auto',
            })
        }
    }
    catch (error) {
        console.log(error)
    }

    loader.hide()
}

const headTitle = ref('发布文章 - M.M.F 小屋')
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
