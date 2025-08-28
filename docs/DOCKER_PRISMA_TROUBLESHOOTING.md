# Docker 빌드 시 Prisma Client 모듈 오류 트러블슈팅

## 문제 현상
- Docker 빌드 중 `pnpm run build` 단계에서 아래와 같은 오류 발생:
  - `Cannot find module '../generated/prisma' or its corresponding type declarations.`
- 이는 Prisma Client가 빌드 전에 생성되지 않아 NestJS가 해당 모듈을 찾지 못해서 발생

## 원인
- Docker 빌드 환경은 완전히 깨끗한 상태이므로, 의존성 설치 후 반드시 `prisma generate` 명령을 명시적으로 실행해야 함
- 로컬 개발 환경에서는 IDE나 postinstall hook이 자동으로 처리해주지만, Dockerfile에서는 직접 명령을 추가해야 함

## 해결 방법
1. Dockerfile에서 의존성 설치 후, 빌드 전에 아래 명령을 추가:
   ```dockerfile
   RUN pnpm prisma generate
   ```
2. 예시 Dockerfile:
   ```dockerfile
   # ...
   RUN pnpm install --frozen-lockfile
   RUN pnpm prisma generate
   COPY . .
   RUN pnpm run build
   # ...
   ```

## 요약
- Docker 빌드 시 Prisma Client가 반드시 사전에 생성되어야 NestJS가 정상적으로 import할 수 있음
- `prisma generate` 명령을 Dockerfile에 추가하면 문제 해결

---

이 문서는 Docker 빌드 환경에서 Prisma Client 관련 모듈 오류가 발생할 때의 원인과 해결 방법을 정리한 트러블슈팅 가이드입니다.
