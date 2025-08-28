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
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist
RUN npm install -g pnpm && pnpm install --prod
RUN pnpm prisma generate

# Expose the port the app runs on
EXPOSE 8080

# Start the application
CMD ["node", "dist/main"]