# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# prisma 폴더를 먼저 복사
COPY prisma ./prisma

# Prisma Client 생성
RUN pnpm prisma generate

# 나머지 소스 복사
COPY . .

# Build the app
RUN pnpm run build

# Expose port 8080
EXPOSE 8080

# Start the app
CMD ["pnpm", "run", "start:prod"]
