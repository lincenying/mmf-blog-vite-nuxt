# 变更记录

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

- 重写 `README.md`，对齐当前项目实际状态（Nuxt 4、版本 `1.26.0727`）
- 补充技术栈、环境变量、端口说明与项目结构
- 修正 Docker / Compose 文档：镜像名 `app-nuxt` / `api-express`、`MONGO_DIR`、去掉不存在的 `docker-compose.prod.yml`
- 统一本地开发 / 生产预览 / Docker 访问地址说明

### Commit Message

```
docs: 优化 README，对齐 Nuxt4 与 Docker Compose 配置
```
