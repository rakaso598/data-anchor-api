# Prisma + Docker 빌드 트러블슈팅 가이드 (실전)

## 1. 의존성 누락 오류
- **원인:** `@prisma/client`와 `prisma` 패키지가 dependencies에 없거나 설치되지 않음
- **해결:**
  - `package.json`의 dependencies에 반드시 아래 두 패키지가 포함되어야 함
    ```json
    "dependencies": {
      "@prisma/client": "^6.15.0",
      "prisma": "^6.15.0"
    }
    ```
  - `pnpm install` 또는 `npm install`로 설치

## 2. NODE_ENV 문제 (devDependencies 미설치)
- **원인:** 프로덕션 빌드 시 devDependencies가 설치되지 않아 `prisma`가 누락될 수 있음
- **해결:**
  - `prisma`를 devDependencies가 아닌 dependencies에 위치시킬 것

## 3. Prisma Client 미생성 오류
- **원인:** Docker 빌드 중 `prisma generate`가 실행되지 않아 `generated/prisma` 폴더가 없음
- **해결:**
  - Dockerfile에서 의존성 설치 후 반드시 아래 명령 추가
    ```dockerfile
    RUN pnpm prisma generate
    ```

## 4. 네트워크 연결 오류
- **원인:** Prisma 바이너리 다운로드 시 네트워크 불안정/방화벽 등
- **해결:**
  - 안정적인 네트워크 환경에서 빌드
  - 필요시 postinstall 스크립트로 prisma generate 자동 실행

## 5. postinstall 스크립트 활용 (선택)
- `package.json`에 아래와 같이 추가하면, 의존성 설치 시 자동으로 Prisma Client가 생성됨
  ```json
  "scripts": {
    "postinstall": "prisma generate"
  }
  ```

---

이 가이드는 Docker + Prisma 환경에서 자주 발생하는 실전 오류와 해결법을 정리한 문서입니다. 미리 대비하면 배포 실패 확률을 크게 줄일 수 있습니다.
