# Docker + Prisma 실전 트러블슈팅: schema.prisma 파일 인식 오류

## 증상
- Docker 빌드 중 `pnpm prisma generate` 단계에서 아래와 같은 에러 발생:
  > Error: Could not find Prisma Schema that is required for this command.
  > Checked following paths: schema.prisma: file not found, prisma/schema.prisma: file not found

## 주요 원인
1. **.dockerignore에 prisma/ 또는 prisma/schema.prisma가 포함되어 있어 복사되지 않음**
2. **Dockerfile에서 prisma 폴더를 복사하기 전에 `pnpm prisma generate`를 실행함**
3. **Docker 빌드 컨텍스트가 잘못되어 prisma 폴더가 포함되지 않음**

## 해결 방법
### 1. .dockerignore 점검
- `.dockerignore`에 아래와 같은 라인이 있으면 반드시 제거:
  ```
  prisma/
  prisma/schema.prisma
  ```

### 2. Dockerfile COPY 순서 점검
- 반드시 prisma 폴더를 먼저 복사한 뒤, `pnpm prisma generate`를 실행해야 함:
  ```dockerfile
  COPY prisma ./prisma
  RUN pnpm prisma generate
  ```

### 3. 빌드 컨텍스트 점검
- 반드시 프로젝트 루트(즉, prisma 폴더가 있는 위치)에서 빌드해야 함:
  ```bash
  docker build -t your-image-name .
  ```

### 4. 멀티스테이지 빌드 예시 (실전)
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm prisma generate
RUN pnpm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist
RUN npm install -g pnpm && pnpm install --prod
EXPOSE 8080
CMD ["node", "dist/main"]
```

## 추가 팁
- `.dockerignore`에 node_modules, dist, test, .git 등 불필요한 파일/폴더를 추가하면 빌드 속도와 이미지 크기가 최적화됨
- 환경변수(특히 API 키)는 Docker secrets 또는 별도의 .env 파일로 관리 권장

## 결론
- 위 순서대로 점검하면 Docker 빌드 시 Prisma schema.prisma 인식 오류는 100% 해결 가능
- 그래도 문제가 발생하면, Dockerfile과 .dockerignore, 빌드 명령어, 빌드 로그를 다시 점검할 것
