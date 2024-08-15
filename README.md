# mmf-blog nuxt 3.0 v3

demo: [http://nuxt.mmxiaowu.com](http://nuxt.mmxiaowu.com)

The main technical stack: nuxt3, pinia, unocss, eslint, ssr

---

#### Other versions

react(spa): [https://github.com/lincenying/mmf-blog-react-v2](https://github.com/lincenying/mmf-blog-react-v2)

react(hooks spa): [https://github.com/lincenying/mmf-blog-vite-react](https://github.com/lincenying/mmf-blog-vite-react)

vue2(spa): [https://github.com/lincenying/mmf-blog-vue2](https://github.com/lincenying/mmf-blog-vue2)

vue2(pwa ssr): [https://github.com/lincenying/mmf-blog-vue2-pwa-ssr](https://github.com/lincenying/mmf-blog-vue2-pwa-ssr)

vue3(spa): [https://github.com/lincenying/mmf-blog-vite-vue3](https://github.com/lincenying/mmf-blog-vite-vue3)

vue3(pwa ssr): [https://github.com/lincenying/mmf-blog-vite-nuxt](https://github.com/lincenying/mmf-blog-vite-nuxt)

nuxt3: [https://github.com/lincenying/mmf-blog-vite-nuxt](https://github.com/lincenying/mmf-blog-vite-nuxt)

---

First installation `api server`:

express-ts: https://github.com/lincenying/mmf-blog-api-ts

## Project setup

```bash
$ pnpm install
```

### Compiles and hot-reloads for development

```bash
$ pnpm serve
```

### Compiles and minifies for production

```bash
$ pnpm build
```

### Preview for production

```bash
$ pnpm start
```

### Lints and fixes files

```bash
$ pnpm lint
```

## docker

### 1. 构建 api-server 容器

克隆 https://github.com/lincenying/mmf-blog-api-ts 仓库后, 按文档中的操作, 构建`api server`镜像, 并启动容器

### 2. 构建 web 容器

```bash
# 构建镜像
docker build -t images-mmf-blog-vite-nuxt -f ./Dockerfile .
# 运行镜像
docker run -d -p 7200:7200 --name container-mmf-blog-vite-nuxt images-mmf-blog-vite-nuxt
# 进入镜像
docker exec -it container-mmf-blog-vite-nuxt /bin/bash
# 停止容器
docker stop container-mmf-blog-vite-nuxt
# 删除容器
docker rm container-mmf-blog-vite-nuxt
# 删除镜像
docker rmi images-mmf-blog-vite-nuxt
```

## docker-compose

使用`docker-compose`, 将会从`docker hub`拉取`api-server`镜像, 并且启动容器
如果已经将`api-server`镜像传到`docker hub`, 修改`docker-compose.yml`中的`api.image`配置, 镜像改成自己的

```yaml
api:
  container_name: api-server
  image: lincenying/api-server:1.0.1
```

修改`docker-compose.yml`中的`mongo.volumes`配置, 将宿主机数据库路径映射到容器中

```yaml
volumes:
  - /Users/lincenying/web/mongodb/data:/data/db
```

```bash
# 生成镜像及启动容器
docker-compose build
docker-compose up -d
```

```bash
# 自动从docker hub拉取mongodb, api-server, web-server镜像, 并启动运行容器
docker-compose up -d -f docker-compose.prod.yml
```

Home Site
http://localhost:7200

Login
[http://localhost:7200/_backend/login] (`http://localhost:7200/_backend/login`)

# LICENSE

MIT
