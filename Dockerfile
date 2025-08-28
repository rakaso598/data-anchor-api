# Stage 1: Build Image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files and Prisma schema to leverage caching
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

# Install all dependencies (including devDependencies)
RUN npm install -g pnpm && pnpm install

# Copy application source code
COPY . .

# Generate Prisma Client (now that files are copied)
RUN pnpm prisma generate

# Build the NestJS application
RUN pnpm run build

# Stage 2: Production Image
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy only production-related files from the builder stage
# This keeps the final image small
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
# pnpm은 별도로 설치하거나, --prod 옵션으로 의존성을 설치해야 합니다.
# pnpm은 node_modules를 복사하는 대신 캐시를 활용하는 것이 더 효율적입니다.
RUN npm install -g pnpm && pnpm install --prod

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["node", "dist/main"]