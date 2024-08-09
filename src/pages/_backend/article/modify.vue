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
                    <option v-for="val in lists" :key="val._id" :value="val._id">{{ val.cate_name }}</option>
                </select>
                <span class="input-info error">请输入分类</span>
            </a-input>
            <div class="settings-section">
                <div id="modify-content" class="settings-item-content">
                    <client-only>
                        <v-md-editor
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
            <a href="javascript:;" class="btn btn-yellow" @click="handleModify">编辑文章</a>
            <router-link to="/_backend/article/list" class="btn btn-blue">返回</router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { AnyFn } from '@vueuse/core'
import { MarkdownEditor } from '~/plugins/md-editor'

import type { Article, Upload } from '@/types'
import { uploadApi } from '~/config'

defineOptions({
    name: 'BackendArticleModify',
})

const { ctx } = useGlobal()
const route = useRoute()
const router = useRouter()

const id = $(useRouteQuery('id'))

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
await useAsyncData('backend-category-list', () => globalCategoryStore.getCategoryItem({ path: route.fullPath, id }).then(() => true))
const { lists } = $(storeToRefs(globalCategoryStore))

const backendArticleStore = useBackendArticleStore()
await useAsyncData('backend-article-modify', () => backendArticleStore.getArticleItem({ id }).then(() => true))
const { item } = $(storeToRefs(backendArticleStore))

const body = reactive({
    id,
    title: '',
    category: '',
    category_name: '',
    category_old: '',
    content: '',
    html: '',
})

watch(
    () => body.category,
    (val) => {
        const obj = lists.find(item => item._id === val)
        if (obj) {
            body.category_name = obj.cate_name
        }
    },
)

watch(
    () => item,
    (val) => {
        if (val.data) {
            body.title = val.data.title
            body.category_old = val.data.category
            body.category = val.data.category
            body.content = val.data.content
        }
    },
    {
        immediate: true,
        deep: true,
    },
)

const [loading, toggleLoading] = useToggle(false)
const frontHtml = ref(true)

const { data: posts } = useNuxtData<ResData<ResDataLists<Article>>>('backend-article-list')

async function handleModify() {
    if (!body.title || !body.category || !body.content) {
        showMsg('请将表单填写完整!')
        return
    }
    if (loading.value) {
        return
    }
    toggleLoading(true)
    if (frontHtml.value) {
        const html = MarkdownEditor.vMdParser.themeConfig.markdownParser.render(body.content)
        body.html = html
    }
    const { code, message, data } = await useHttp().$post<ResData<Article>>('/api/backend/article/modify', {}, { body })
    toggleLoading(false)
    if (code === 200) {
        showMsg({ type: 'success', content: message })

        const index = posts.value?.data.list.findIndex(ii => ii._id === body.id) || -1
        if (index > -1) {
            posts.value?.data.list.splice(index, 1, data)
        }

        router.push('/_backend/article/list')
    }
}

async function handleUploadImage(event: EventTarget, insertImage: AnyFn, files: FileList) {
    const loader = ctx.$loading.show()

    const formData = new FormData()
    formData.append('file', files[0])
    const { data } = await useHttp().$post<ResData<Upload>>(`${uploadApi}/api/fetch/upload`, {}, { body: formData })
    if (data && data.filepath) {
        insertImage({
            url: `${uploadApi}/${data.filepath}`,
            desc: '',
            // width: 'auto',
            // height: 'auto',
        })
    }

    loader.hide()
}

const headTitle = ref('编辑文章 - M.M.F 小屋')
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
