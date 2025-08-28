# Stage 1: Build Image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy all files at once to use Docker's caching efficiently
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
COPY . .

# Install dependencies including devDependencies for build process
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Generate Prisma Client (now that files are copied)
RUN pnpm prisma generate

# Build the application
RUN pnpm run build

# Stage 2: Production Image
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy only production-relevant files from the builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

# Expose the application port
EXPOSE 8080

# Run the production app
CMD ["node", "dist/main"]