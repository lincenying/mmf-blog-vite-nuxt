# Use a smaller base image
ARG NODE_VERSION=node:18-alpine

# Production image
FROM $NODE_VERSION AS production

# Install pnpm
RUN npm config set registry https://registry.npmmirror.com

RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy the package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy built assets from previous stage
COPY ./.output /app/.output

# Define environment variables
ENV NUXT_HOST=0.0.0.0 \
    NUXT_APP_VERSION=latest \
    NODE_ENV=production \
    HOST_API_URL=http://host.docker.internal:4000


EXPOSE 3000

# Start the app
CMD ["node", "/app/.output/server/index.mjs"]

# 构建镜像
# docker build -t mmf-blog-vite-nuxt -f ./Dockerfile .
# 运行镜像
# docker run -d -p 3008:3000 --name container-nuxt mmf-blog-vite-nuxt
# 进入镜像
# docker exec -it container-nuxt bash
# 停止容器
# docker stop container-nuxt
# 删除容器
# docker rm container-nuxt
# 删除镜像
# docker rmi mmf-blog-vite-nuxt
