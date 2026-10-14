# M.M.F 小屋 · Nuxt 版

个人博客前台 + 后台管理系统，基于 **Nuxt 4** SSR。Docker Compose 配套 **Bun API** 与 **PostgreSQL**。

- Demo：[http://nuxt.mmxiaowu.com](http://nuxt.mmxiaowu.com)
- 版本：`1.26.1014`（`package.json`）
- License：MIT

## 技术栈

| 类别 | 选型                                                   |
| ---- | ------------------------------------------------------ |
| 框架 | Nuxt 4 / Vue 3 / TypeScript                            |
| 状态 | Pinia                                                  |
| UI   | Element Plus + UnoCSS                                  |
| 能力 | SSR、PWA（可选）、Color Mode、VueUse                   |
| 工程 | pnpm 12、ESLint、Stylelint、vue-tsc / `nuxt typecheck` |
| 部署 | Docker / Docker Compose、GitHub Actions                |

前台走 SSR。`/_backend/**` 在 `nuxt.config.ts` 中关闭 SSR，后台为客户端渲染。

## 相关仓库

| 项目                                                                         | 说明                                      |
| ---------------------------------------------------------------------------- | ----------------------------------------- |
| `lincenying/api-bun-postgre`                                                 | Compose 中的 API 镜像（Bun + PostgreSQL） |
| [mmf-blog-vite-vue3](https://github.com/lincenying/mmf-blog-vite-vue3)       | Vue3 SPA                                  |
| [mmf-blog-vite-react](https://github.com/lincenying/mmf-blog-vite-react)     | React Hooks SPA                           |
| [mmf-blog-react-v2](https://github.com/lincenying/mmf-blog-react-v2)         | React SPA                                 |
| [mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2)                 | Vue2 SPA                                  |
| [mmf-blog-vue2-pwa-ssr](https://github.com/lincenying/mmf-blog-vue2-pwa-ssr) | Vue2 PWA SSR                              |

## 环境要求

- Node.js `>= 22`
- pnpm `12`（`packageManager`: `pnpm@12.11.2`）
- （可选）Docker / Docker Compose

## 快速开始

### 1. 启动 API

本地开发可不启 Compose，直接把 `NUXT_API_URL` 指到已有 API。未配置时，开发环境回退到 `https://api.mmxiaowu.com`。

使用本仓库 Compose 时，API 镜像为 `lincenying/api-bun-postgre`，宿主机端口 `4000`。

### 2. 配置环境变量

复制 `.env.example` 为 `.env`（Compose 会读取该文件做变量替换，并注入 Nuxt 容器）：

```bash
# Web 镜像标签（与 package.json version 一致）
TAG=1.26.1014

# Compose 中 Bun API 镜像标签（当前 compose 读的是 API_POSTGRES_TAG，不是 .env.example 里的 API_TAG）
API_POSTGRES_TAG=1.26.1014

# Web 端口（Docker 容器内）
PORT=7200

# API 地址：推荐 NUXT_API_URL（兼容旧变量 NUXT_ENV_API_URL）
NUXT_API_URL=https://api.mmxiaowu.com
# NUXT_ENV_API_URL=https://api.mmxiaowu.com
# 本地 Docker 网络内示例: NUXT_API_URL=http://api:4000

# 可选：上传接口，对应 runtimeConfig.public.uploadApi
# NUXT_PUBLIC_UPLOAD_API=https://php.mmxiaowu.com

# PostgreSQL（Compose 使用，占位值见 .env.local.expmple）
POSTGRES_DIR=/data/web/postgresql/data
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=数据库用户名
POSTGRES_PASSWORD=数据库密码
POSTGRES_DB=数据库名称
```

`/api/**` 由 `server/middleware/api.ts` 代理到 `runtimeConfig.apiUrl`（`NUXT_API_URL`，其次 `NUXT_ENV_API_URL` / `NUXT_ENV_HOST_API_URL`）。单独 `docker run` 时，镜像默认 `NUXT_ENV_HOST_API_URL=http://host.docker.internal:4008`。

### 3. 安装依赖并开发

```bash
pnpm install
pnpm serve          # 开发：http://localhost:7223
# pnpm dev:pwa      # 开发并启用 PWA
```

### 4. 构建与预览

```bash
pnpm build            # 产出 .output
pnpm start            # 生产预览：http://localhost:7222
pnpm generate         # 静态导出（可选）
pnpm start:generate   # 预览静态产物
```

### 5. 代码检查

```bash
pnpm lint        # ESLint
pnpm lint:fix    # ESLint 自动修复
pnpm lint:ts     # vue-tsc
pnpm typecheck   # nuxt typecheck
pnpm lint:css    # Stylelint
```

## 访问地址

| 场景                         | 地址                                  |
| ---------------------------- | ------------------------------------- |
| 本地开发                     | http://localhost:7223                 |
| 本地生产预览（`pnpm start`） | http://localhost:7222                 |
| Docker / Compose             | http://localhost:7200                 |
| 后台登录                     | http://localhost:7200/\_backend/login |
| Compose 中的 API             | http://localhost:4000                 |

## Docker 单独构建 Web

适用于已有可用 API（本机或远程）的场景。

```bash
# 若拉取官方 node 镜像较慢，可先使用华为云镜像源：
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22
docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22 node:22-alpine

# 构建（标签与 package.json version / TAG 一致）
docker build -t lincenying/app-nuxt:1.26.1014 -f ./Dockerfile .

# 运行。镜像内默认 NUXT_ENV_HOST_API_URL=http://host.docker.internal:4008
# 若对接本仓库 Compose 的 API（宿主机 4000），额外传入：
#   -e NUXT_API_URL=http://host.docker.internal:4000
docker run -d \
  -p 7200:7200 \
  --add-host=host.docker.internal:host-gateway \
  --name container-mmf-blog-vite-nuxt \
  lincenying/app-nuxt:1.26.1014

# 常用运维
docker exec -it container-mmf-blog-vite-nuxt /bin/sh
docker stop container-mmf-blog-vite-nuxt
docker rm container-mmf-blog-vite-nuxt
docker rmi lincenying/app-nuxt:1.26.1014
```

## Docker Compose（PostgreSQL + API + Nuxt）

`docker-compose.yml` 启动三个服务。API 会等 Postgres 健康检查通过后再启动。镜像标签来自 `.env` 的 `API_POSTGRES_TAG`、`TAG`。

| 服务       | 容器名            | 说明                                                                                                            |
| ---------- | ----------------- | --------------------------------------------------------------------------------------------------------------- |
| `postgres` | `db-postgres`     | `postgres:18-alpine`；数据目录 `${POSTGRES_DIR:-/var/lib/postgresql}`；端口 `${POSTGRES_PORT:-5432}`            |
| `api`      | `api-bun-postgre` | 镜像 `lincenying/api-bun-postgre:${API_POSTGRES_TAG}`；宿主机 `4000` → 容器 `4000`；挂载 `./uploads`、`./.data` |
| `nuxt`     | `app-nuxt`        | 本仓库构建，镜像 `lincenying/app-nuxt:${TAG}`，端口 `7200`                                                      |

Compose 内 Nuxt 已设置 `NUXT_API_URL` / `NUXT_ENV_API_URL=http://api:4000`，走 Docker 网络。

使用自己的 API 镜像时，改 `api.image`：

```yaml
api:
  container_name: api-bun-postgre
  image: your-registry/api-bun-postgre:${API_POSTGRES_TAG}
```

```bash
# 构建并后台启动
docker compose -f docker-compose.yml build
docker compose -f docker-compose.yml up -d

# 查看状态 / 日志
docker compose ps
docker compose logs -f nuxt

# 停止并移除容器
docker compose down
```

启动后访问：

- 前台：http://localhost:7200
- 后台：http://localhost:7200/\_backend/login
- API：http://localhost:4000

## 持续集成

`.github/workflows/ci.yml` 在 `main` / `master` 推送和 Pull Request 时执行：安装依赖、`nuxi prepare`、`pnpm build`（`NUXT_API_URL=https://api.mmxiaowu.com`）。

## 项目结构（简要）

```text
├── src/                 # Nuxt 应用目录（srcDir）
│   ├── api/             # 前台 / 后台请求封装
│   ├── pages/           # 前台页面 + _backend 后台
│   ├── components/
│   ├── stores/          # Pinia
│   ├── composables/
│   ├── middleware/      # 前台 / 后台鉴权
│   ├── plugins/
│   └── layouts/
├── server/middleware/   # Nitro：/api 代理
├── public/
├── .github/workflows/   # CI
├── Dockerfile
├── docker-compose.yml
└── nuxt.config.ts
```

## LICENSE

[MIT](./LICENSE)
