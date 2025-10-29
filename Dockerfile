# Use a smaller base image
ARG NODE_VERSION=node:22-alpine

# Production image
FROM $NODE_VERSION AS production

# Install pnpm
RUN npm config set registry https://registry.npmmirror.com

RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy the package files
COPY . .

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm run build

# Define environment variables
ENV NUXT_HOST=0.0.0.0
ENV NUXT_APP_VERSION=latest
ENV NODE_ENV=production
ENV PORT=7200
ENV NUXT_ENV_HOST_API_URL=http://host.docker.internal:4008


EXPOSE 7200

# Start the app
CMD ["node", "./.output/server/index.mjs"]

# 第一次执行时, 如果node镜像拉不下来, 可以执行以下命令:
# docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22
# docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22 node:22-alpine
# 构建镜像
# docker build -t lincenying/images-mmf-blog-vite-nuxt:1.25.1029 -f ./Dockerfile .
# 运行镜像
# docker run -d -p 7200:7200 --add-host=host.docker.internal:host-gateway --name container-nuxt lincenying/images-mmf-blog-vite-nuxt:1.25.1029
# 进入镜像
# docker exec -it container-nuxt /bin/sh
# 停止容器
# docker stop container-nuxt
# 删除容器
# docker rm container-nuxt
# 删除镜像
# docker rmi mmf-blog-vite-nuxt
