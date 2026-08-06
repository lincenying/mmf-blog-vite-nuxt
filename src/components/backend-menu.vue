<template>
    <div class="main-right">
        <div class="card card-me">
            <NuxtLink to="/_backend/admin/list" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />管理帐号
            </NuxtLink>
            <NuxtLink to="/_backend/user/list" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />用户列表
            </NuxtLink>
        </div>
        <div class="card card-me">
            <NuxtLink to="/_backend/category/insert" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />添加分类
            </NuxtLink>
            <NuxtLink to="/_backend/category/list" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />管理分类
            </NuxtLink>
            <NuxtLink to="/_backend/article/insert" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />发布文章
            </NuxtLink>
            <NuxtLink to="/_backend/article/list" active-class="active" class="side-entry">
                <i class="icon icon-arrow-right" />
                <i class="icon icon-menu-articles" />管理文章
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: 'BackendMenu',
})
</script>
