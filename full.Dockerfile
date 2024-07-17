# Use a smaller base image
ARG NODE_VERSION=node:18-alpine

# Stage 1: Build dependencies
FROM $NODE_VERSION AS dependency-base

# Create app directory
WORKDIR /app

# Install pnpm
RUN npm config set registry https://registry.npmmirror.com

RUN npm install -g pnpm

# Copy the package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM dependency-base AS production-base

# Copy the source code
COPY . .

# Build the application
RUN pnpm run build

# Stage 3: Production image
FROM $NODE_VERSION AS production

# Copy built assets from previous stage
COPY --from=production-base /app/.output /app/.output

# Define environment variables
ENV NUXT_HOST=0.0.0.0 \
    NUXT_APP_VERSION=latest \
    NODE_ENV=production \
    HOST_API_URL=http://host.docker.internal:4000

# Set the working directory
WORKDIR /app

EXPOSE 3000

# Start the app
CMD ["node", "/app/.output/server/index.mjs"]

# 构建镜像
# docker build -t mmf-blog-vite-nuxt -f ./full.Dockerfile .
# 运行镜像
# docker run -d -p 7222:3000 --name container-nuxt mmf-blog-vite-nuxt
# 进入镜像
# docker exec -it container-nuxt bash
