# M.M.F 小屋 · Nuxt 版

个人博客前台 + 后台管理系统，基于 **Nuxt 4** SSR，配套 Express API 与 MongoDB。

- Demo：[http://nuxt.mmxiaowu.com](http://nuxt.mmxiaowu.com)
- 版本：`1.26.0727`
- License：MIT

## 技术栈

| 类别 | 选型 |
| --- | --- |
| 框架 | Nuxt 4 / Vue 3 / TypeScript |
| 状态 | Pinia |
| UI | Element Plus + UnoCSS |
| 能力 | SSR、PWA（可选）、Color Mode、VueUse |
| 工程 | pnpm、ESLint、Stylelint、vue-tsc |
| 部署 | Docker / Docker Compose |

## 相关仓库

| 项目 | 说明 |
| --- | --- |
| [mmf-blog-api-ts](https://github.com/lincenying/mmf-blog-api-ts) | API 服务（Express + TypeScript + MongoDB），**需先部署** |
| [mmf-blog-vite-vue3](https://github.com/lincenying/mmf-blog-vite-vue3) | Vue3 SPA |
| [mmf-blog-vite-react](https://github.com/lincenying/mmf-blog-vite-react) | React Hooks SPA |
| [mmf-blog-react-v2](https://github.com/lincenying/mmf-blog-react-v2) | React SPA |
| [mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2) | Vue2 SPA |
| [mmf-blog-vue2-pwa-ssr](https://github.com/lincenying/mmf-blog-vue2-pwa-ssr) | Vue2 PWA SSR |

## 环境要求

- Node.js `>= 22`
- pnpm `>= 11`
- （可选）Docker / Docker Compose

## 快速开始

### 1. 启动 API

按 [mmf-blog-api-ts](https://github.com/lincenying/mmf-blog-api-ts) 文档启动 API（默认本地 `http://localhost:4000` 或 `4008`）。

### 2. 配置环境变量

在项目根目录创建 / 调整 `.env`：

```bash
# Docker Compose 镜像标签
API_TAG=1.26.0727
TAG=1.26.0727

# Web 端口（Docker 容器内）
PORT=7200

# API 地址：本地开发可指向线上或本机 API
NUXT_ENV_API_URL=https://api.mmxiaowu.com

# MongoDB 数据目录（仅 docker compose 使用，可按本机路径修改）
MONGO_DIR=./data/mongodb
```

> `/api/**` 请求由 Nitro 中间件代理到 `NUXT_ENV_API_URL`（或容器内的 `NUXT_ENV_HOST_API_URL`）。

### 3. 安装依赖并开发

```bash
pnpm install
pnpm serve          # 开发：http://localhost:7223
# pnpm dev:pwa      # 开发并启用 PWA
```

### 4. 构建与预览

```bash
pnpm build          # 产出 .output
pnpm start          # 生产预览：http://localhost:7222
pnpm generate       # 静态导出（可选）
```

### 5. 代码检查

```bash
pnpm lint           # ESLint
pnpm lint:fix      # ESLint 自动修复
pnpm lint:ts        # TypeScript 检查
pnpm lint:css       # Stylelint
```

## 访问地址

| 场景 | 地址 |
| --- | --- |
| 本地开发 | http://localhost:7223 |
| 本地生产预览（`pnpm start`） | http://localhost:7222 |
| Docker / Compose | http://localhost:7200 |
| 后台登录 | http://localhost:7200/_backend/login |

## Docker 单独构建 Web

适用于已有可用 API（本机或远程）的场景。

```bash
# 若拉取官方 node 镜像较慢，可先使用华为云镜像源：
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22
docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22 node:22-alpine

# 构建
docker build -t lincenying/app-nuxt:1.26.0727 -f ./Dockerfile .

# 运行（容器内默认访问 host.docker.internal:4008 上的 API）
docker run -d \
  -p 7200:7200 \
  --add-host=host.docker.internal:host-gateway \
  --name container-mmf-blog-vite-nuxt \
  lincenying/app-nuxt:1.26.0727

# 常用运维
docker exec -it container-mmf-blog-vite-nuxt /bin/sh
docker stop container-mmf-blog-vite-nuxt
docker rm container-mmf-blog-vite-nuxt
docker rmi lincenying/app-nuxt:1.26.0727
```

## Docker Compose（Mongo + API + Nuxt）

`docker-compose.yml` 会启动三个服务：

| 服务 | 容器名 | 说明 |
| --- | --- | --- |
| `mongo` | `db-mongo-server` | MongoDB 4.0，数据目录由 `MONGO_DIR` 映射 |
| `api` | `api-express` | 镜像 `lincenying/api-express:${API_TAG}` |
| `nuxt` | `app-nuxt` | 本仓库构建，镜像 `lincenying/app-nuxt:${TAG}` |

### 配置说明

1. **镜像标签 / 数据目录**：在 `.env` 中设置 `API_TAG`、`TAG`、`MONGO_DIR`。
2. **自定义 API 镜像**：若已推送自己的 API 镜像，修改 `docker-compose.yml`：

```yaml
api:
  container_name: api-express
  image: your-registry/api-express:1.26.0727
```

3. **容器内 API 地址**：Compose 中 Nuxt 已配置 `NUXT_ENV_API_URL=http://api:4000`，无需再指向宿主机。

### 启动

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
- 后台：http://localhost:7200/_backend/login
- API：http://localhost:4008

## 项目结构（简要）

```text
├── src/                 # Nuxt 应用目录（srcDir）
│   ├── pages/           # 前台 + _backend 后台页面
│   ├── components/      # 组件
│   ├── stores/          # Pinia
│   ├── composables/     # 组合式函数
│   └── layouts/         # 布局
├── server/middleware/   # Nitro：/api 代理
├── public/              # 静态资源
├── Dockerfile
├── docker-compose.yml
└── nuxt.config.ts
```

## LICENSE

[MIT](./LICENSE)
