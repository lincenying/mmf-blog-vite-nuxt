# Use a smaller base image
ARG NODE_VERSION=node:22-alpine

# Stage 1: Build dependencies
FROM $NODE_VERSION AS dependency-base

# Create app directory
WORKDIR /app

COPY . .

# Install pnpm
RUN npm config set registry https://registry.npmmirror.com

RUN npm install -g pnpm

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile --ignore-scripts

# Build the application
RUN npm run build

# Stage 2: Production image
FROM $NODE_VERSION AS production

# Create app directory
WORKDIR /app

# Copy built assets from previous stage
COPY --from=dependency-base /app/.output /app/.output

# Define environment variables
ENV NUXT_HOST=0.0.0.0
ENV NUXT_APP_VERSION=latest
ENV NODE_ENV=production
ENV PORT=7200
ENV NUXT_ENV_HOST_API_URL=http://host.docker.internal:4008

EXPOSE 7200

# Start the app
CMD ["node", "/app/.output/server/index.mjs"]

# 第一次执行时, 如果node镜像拉不下来, 可以执行以下命令:
# docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22
# docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/node:22-alpine3.22 node:22-alpine
# 构建镜像
# docker build -t lincenying/images-mmf-blog-vite-nuxt:1.25.1029 -f ./full.Dockerfile .
# 运行镜像
# docker run -d -p 7222:3000 --name container-nuxt lincenying/images-mmf-blog-vite-nuxt:1.25.1029
# 进入镜像
# docker exec -it container-nuxt bash
