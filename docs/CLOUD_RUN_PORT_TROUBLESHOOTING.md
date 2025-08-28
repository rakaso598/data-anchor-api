# Cloud Run 배포 시 NestJS 포트 문제 트러블슈팅

## 증상
- Cloud Run 배포 시 아래와 같은 오류로 컨테이너가 준비되지 않음:
  > The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable within the allocated timeout.

## 원인
- NestJS 앱이 `app.listen(3000)` 또는 `app.listen(8080)` 등으로 **포트를 하드코딩**하여 실행됨
- Cloud Run은 `PORT` 환경 변수로 포트 번호를 주입하므로, 앱이 반드시 이 값을 읽어야 함

## 해결 방법
1. `src/main.ts`에서 아래와 같이 수정:
   ```typescript
   const port = process.env.PORT || 8080;
   await app.listen(port);
   ```
2. 이렇게 하면 Cloud Run에서는 환경변수 포트로, 로컬에서는 8080 포트로 실행됨

## 결론
- Cloud Run 등 컨테이너 기반 배포 환경에서는 반드시 `process.env.PORT`를 사용해야 함
- 하드코딩된 포트는 배포 실패의 주요 원인
