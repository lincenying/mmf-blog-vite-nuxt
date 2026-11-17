# 变更记录

## 2026-11-17 17:03:30

### 改动内容

- `useFetch` / `$fetch` 不再把响应类型写进类型参数，避免 `method` 被收成无法赋值的条件类型
- `watch` 改为 Vue 的 `MultiWatchSources`

### Commit Message

```
fix: 修复请求封装的 method 类型不匹配
```

## 2026-11-17 16:53:47

### 改动内容

- 后台路由关闭了 SSR，刷新后客户端读不到 httpOnly 的 `b_user`，不再据此跳回登录页
- 刷新后由浏览器请求管理员列表接口校验会话，只有接口明确未登录才清除 Cookie 并跳转

### Commit Message

```
fix: 刷新后台页面时按接口校验登录态
```

## 2026-11-17 16:45:30

### 改动内容

- 刷新后用请求头里的 Cookie 恢复前台登录态，不再只依赖客户端读不到的 `useCookie`
- 鉴权与 `$fetch` 改为 `useRequestFetch`，SSR 会带上当前请求的 Cookie
- Cookie 解析按第一个 `=` 分割，避免值里的 `=` 被截断

### Commit Message

```
fix: 刷新后根据请求 Cookie 恢复登录态
```

## 2026-11-17 16:41:30

### 改动内容

- `src/pages/user.vue` 的嵌套出口从已移除的 `NuxtChild` 改为 `NuxtPage`，账户页内容可以渲染

### Commit Message

```
fix: 用户页嵌套路由改用 NuxtPage
```

## 2026-11-17 16:39:30

### 改动内容

- 后台鉴权与前台对齐：客户端读不到 httpOnly 的 `b_user` 时不再清空登录态
- 用 `backend-b-user` 保留 SSR / 登录成功后的会话标记，只有接口确认失效才清除
- 请求失败只跳回登录页，不删除 Cookie

### Commit Message

```
fix: 修复后台鉴权误清除 b_user 登录态
```

## 2026-11-17 16:35:30

### 改动内容

- 修复点击导航头像进入账户页时被判定未登录并清空登录态
- 客户端鉴权改为同时认可 `useCookie` 与 SSR 写入的 store，只有接口确认会话失效才清除

### Commit Message

```
fix: 修复点击头像进入账户页时误清除登录态
```

## 2026-11-17 16:32:00

### 改动内容

- 路由离开守卫不再调用已弃用的 `next()`，改为直接返回
- 涉及 `src/composables/scroll.ts`、`src/composables/index.ts`

### Commit Message

```
fix: 移除导航守卫中已弃用的 next 回调
```

## 2026-11-17 16:29:00

### 改动内容

- 修复导航头像与账户链接的水合不一致：客户端水合时不再用空 Cookie 覆盖 SSR 已写入的登录态

### Commit Message

```
fix: 避免水合时清空 SSR 登录态导致导航头像不一致
```

## 2026-11-17 16:27:00

### 改动内容

- `app.vue` 中已移除的 `VitePwaManifest` 改为 `@vite-pwa/nuxt` 2 注册的 `NuxtPwaManifest`

### Commit Message

```
fix: 替换已移除的 VitePwaManifest 组件
```

## 2026-11-17 16:24:38

### 改动内容

- 修复 `nuxi dev` 启动报错 `options.hostname.toLowerCase is not a function`
- `devServer.host` 显式设为 `localhost`，避免 Nuxt 4.6 把它解析成空对象
- 删除错误的 `node_modules/.cache/nuxt/dev-server.json`

### Commit Message

```
fix: 修复 Nuxt 开发服务器 hostname 不是字符串导致启动失败
```

## 2026-11-17 15:34:18

### 改动内容

- 文章详情、后台编辑页和评论页在同一路由组件复用时会按当前 ID 重新请求，并丢弃过期响应
- 评论列表页码与文章列表对齐，后台「加载更多」不再重复请求当前页
- 分类、搜索、热门列表在快速切换时不再被旧请求覆盖；离开这些页面时不再误触发请求
- 评论输入改为模板引用，空评论会被拦截，删除评论有明确文案，发表后同步评论数
- 外链补齐 `rel`，搜索关键词编码，账号页改为首屏拉取并回写邮箱 Cookie
- 点赞数不会减成负数，请求失败提示改为中文，`showMsg` / `useLockFn` 收紧类型

### Commit Message

```
fix: 修复路由复用时的详情错乱与评论分页
```

## 2026-10-14 10:41:30

### 改动内容

- README 按 git 中的 Compose 改动，从 MongoDB + Express 改为 PostgreSQL 18 + `api-bun-postgre`
- 补充 `API_POSTGRES_TAG`、Postgres 环境变量，API 宿主机端口改为 `4000`
- 单独 `docker run` 仍说明镜像默认访问 `host.docker.internal:4008`，并注明对接新 API 时需覆盖 `NUXT_API_URL`

### Commit Message

```
docs: README 对齐 PostgreSQL 与 Bun API 的 Compose 配置
```

## 2026-10-14 10:36:52

### 改动内容

- 按当前仓库更新 README：容器名 `db-mongo-nuxt` / `api-express-nuxt`、Mongo 仅绑定 `127.0.0.1:27017`
- 环境变量示例与 `.env.example` 对齐（`API_TAG=1.26.0804`、`TAG=1.26.1117`、`NUXT_API_URL`）
- 补充 `typecheck`、后台关闭 SSR、CI 与 `src/api` 目录说明

### Commit Message

```
docs: 按当前 Compose 与环境变量更新 README
```

## 2026-08-06 17:08:38

### 改动内容

- 修复 `useRouteParam`：在 `typedPages` 下将 `route.params` 按 `Record` 读取，消除动态 `string` 索引报错

### Commit Message

```
fix: 修复 useRouteParam 在 typedPages 下的 params 索引类型错误
```

## 2026-08-06 17:04:17

### 改动内容

- 全站 `router-link` 替换为 `NuxtLink`，启用预取与统一导航能力
- 新增 `src/api/*` 请求封装，Pinia stores / 评论发表改为调用 API 层
- 收紧核心类型：去掉过时 `asyncData` 类型与索引 `any`，`User.password` 改为可选，评论用户结构化
- `use-http` / `useRouteParam` / `useRouteQuery` 去掉 `any`
- 文章详情 `v-html` 经 `isomorphic-dompurify` 消毒
- 新增 GitHub Actions CI（install + nuxi prepare + build）

### Commit Message

```
refactor: 抽取 API 层并统一 NuxtLink，收紧类型与 HTML 消毒
```

## 2026-08-06 16:58:11

### 改动内容

- Markdown 编辑器改为后台页按需动态加载，移除全局插件与根样式引入，减小前台包体积
- 新增 `usePageSeo` / `createSeoDescription`，列表、文章详情、关于页补齐 description 与 OG/Twitter
- 上传地址改为 `runtimeConfig.public.uploadApi`（`useUploadApi`）
- 前后台鉴权中间件增加账户/管理员接口会话校验，并在登录/退出时重置校验状态
- 拆分 `dependencies` / `devDependencies`，移除未使用的 `highlight.js`、`store2`、`consola`
- 删除过时的 SPA 风格 `netlify.toml`；生产环境关闭 Nuxt DevTools；清理滚动相关 `console.log`
- README 环境变量说明对齐 `NUXT_API_URL`

### Commit Message

```
perf: 拆分 MD 编辑器与依赖，并增强 SEO 与鉴权校验
```

## 2026-08-06 16:54:08

### 改动内容

- 新增 `auth-cookies` 插件：将前端登录 Cookie 同步到 Pinia；登录成功后更新 store，不再整页 reload
- 修复评论组件误用 `route.query.id`，改为 `route.params.id`
- 修复文章列表 store 的 `pageType` 缓存/分页/点赞状态读写错误
- 修复后台文章编辑分类下拉误调 `getCategoryItem`，并拆分冲突的 `callOnce` key
- `.gitignore` 忽略 `.env`，补充 `.env.example`，并从 Git 取消跟踪 `.env`
- Docker Mongo 端口仅绑定 `127.0.0.1:27017`；Compose 增加 `NUXT_API_URL`
- `use-http`：SSR 禁用 `ElMessage`；`useFetch` key 纳入 query/params
- `runtimeConfig.apiUrl` 驱动 API 代理；`/_backend/**` 关闭 SSR
- 分类/搜索/热门页：动态 `callOnce` key、路由 watch，加载更多传入正确 `pageType`

### Commit Message

```
fix: 修复登录态/评论ID/列表分页等缺陷并完善代理与环境配置
```

## 2026-08-06 14:06:29

### 改动内容

- 将 `process.client` / `process.server` 替换为 `import.meta.client` / `import.meta.server`
- 涉及 `src/middleware/backend-auth.ts`、`src/middleware/frontend-auth.ts`，并移除相关 eslint-disable

### Commit Message

```
fix: 替换已弃用的 process.client/server 为 import.meta
```

## 2026-07-27 13:55:25

### 改动内容

- 重写 `README.md`，对齐当前项目实际状态（Nuxt 4、版本 `1.26.1117`）
- 补充技术栈、环境变量、端口说明与项目结构
- 修正 Docker / Compose 文档：镜像名 `app-nuxt` / `api-express`、`MONGO_DIR`、去掉不存在的 `docker-compose.prod.yml`
- 统一本地开发 / 生产预览 / Docker 访问地址说明

### Commit Message

```
docs: 优化 README，对齐 Nuxt4 与 Docker Compose 配置
```
