# 变更记录

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
- 环境变量示例与 `.env.example` 对齐（`API_TAG=1.26.0804`、`TAG=1.26.1014`、`NUXT_API_URL`）
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

- 重写 `README.md`，对齐当前项目实际状态（Nuxt 4、版本 `1.26.1014`）
- 补充技术栈、环境变量、端口说明与项目结构
- 修正 Docker / Compose 文档：镜像名 `app-nuxt` / `api-express`、`MONGO_DIR`、去掉不存在的 `docker-compose.prod.yml`
- 统一本地开发 / 生产预览 / Docker 访问地址说明

### Commit Message

```
docs: 优化 README，对齐 Nuxt4 与 Docker Compose 配置
```
