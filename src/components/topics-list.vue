<template>
    <div class="main wrap">
        <div class="main-left">
            <div class="cards-wrap home-feeds">
                <!-- <topics-item-none v-if="!topics.path">加载中, 请稍等...</topics-item-none> -->
                <div v-if="!topics.path" class="card card-content-loader">
                    <ContentLoader :height="160" :width="660" :speed="2" primary-color="#f3f3f3" secondary-color="#ecebeb">
                        <rect x="70" y="15" rx="4" ry="4" width="117" height="6.4" /> <rect x="70" y="35" rx="3" ry="3" width="85" height="6.4" />
                        <rect x="0" y="80" rx="3" ry="3" width="550" height="6.4" /> <rect x="0" y="100" rx="3" ry="3" width="620" height="6.4" />
                        <rect x="0" y="120" rx="3" ry="3" width="401" height="6.4" /> <rect x="0" y="140" rx="3" ry="3" width="501" height="6.4" />
                        <circle cx="30" cy="30" r="30" />
                    </ContentLoader>
                </div>
                <template v-else-if="topics.data.length > 0">
                    <TopicsItem v-for="item in topics.data" :key="item._id" :item="item" />
                    <div class="load-more-wrap">
                        <a v-if="topics.hasNext" href="javascript:;" class="load-more" :class="loading ? 'loading' : ''" @click="handleLoadMore()">
                            {{ loading ? '加载中' : '更多' }} <i class="icon icon-circle-loading" />
                        </a>
                    </div>
                </template>
                <topics-item-none v-else>当前分类还没有文章...</topics-item-none>
            </div>
        </div>
        <div class="main-right">
            <aside-category :category="category" />
            <aside-trending :trending="trending" />
            <aside-other />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ContentLoader } from 'vue-content-loader'
import type { PageType } from '~/stores/use-frontend-article-store'
import type { ApiConfig, Article, FArticleStore } from '~/types'

defineOptions({
    name: 'FrontendTopicList',
})

const props = defineProps<{
    topics: FArticleStore['lists']
    loading: boolean
    pageType: PageType
    categoryId?: string
    searchKey?: string
}>()

const emits = defineEmits(['loadMore'])

const { topics, pageType, categoryId, searchKey } = $(toRefs(props))

// pinia 状态管理 ===>
const globalCategoryStore = useGlobalCategoryStore()
const frontendArticleStore = useFrontendArticleStore()

await useAsyncData('frontend-index', () => Promise.all([
    globalCategoryStore.getCategoryList({}),
    frontendArticleStore.getTrending(),
]))

const { lists: category } = $(storeToRefs(globalCategoryStore))
const { trending } = $(storeToRefs(frontendArticleStore))

async function handleLoadMore(page = topics.page) {
    console.log(222223)
    emits('loadMore', page)
}

const headTitle = computed(() => {
    let title = 'M.M.F 小屋'
    if (pageType === 'category') {
        const obj = category.find(item => item._id === categoryId)
        if (obj)
            title = `${obj.cate_name} - ${title}`
    }
    else if (pageType === 'search') {
        title = `搜索: ${searchKey} - ${title}`
    }
    else if (pageType === 'visit') {
        title = `热门 - ${title}`
    }
    return title
})

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
