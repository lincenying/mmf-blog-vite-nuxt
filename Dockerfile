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
COPY . .

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

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

# 构建镜像
# docker build -t mmf-blog-vite-nuxt -f ./Dockerfile .
# 运行镜像
# docker run -d -p 7200:7200 --name container-nuxt mmf-blog-vite-nuxt
# 进入镜像
# docker exec -it container-nuxt /bin/sh
# 停止容器
# docker stop container-nuxt
# 删除容器
# docker rm container-nuxt
# 删除镜像
# docker rmi mmf-blog-vite-nuxt
