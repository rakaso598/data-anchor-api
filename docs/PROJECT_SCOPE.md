# 프로젝트 목표 및 구현 범위

## 1. 목표 구현치
- 불변성 원칙을 모사한 CRUD + 이력 API 엔드포인트 완성
- 엔드포인트 목록:
  - `POST /records` : 데이터 생성
  - `GET /records` : 전체/최신 데이터 조회
  - `GET /records/:key` : 특정 데이터(최신) 조회
  - `PUT/PATCH /records/:key` : 데이터 수정(새 버전 추가)
  - `DELETE /records/:key` : 데이터 삭제(삭제 상태 새 버전 추가)
  - `GET /records/:key/history` : 특정 데이터의 전체 이력 조회
- Prisma 기반 데이터 모델 및 서비스 구현
- Swagger(OpenAPI)로 API 문서 자동화
- 포트 8080에서 서비스 구동
- Dockerfile 및 docker-compose로 컨테이너화
- 각 엔드포인트별로 1개씩, 정상 동작만 확인하는 가벼운 테스트 코드 작성

## 2. 추가 구현/운영 사항
- Swagger UI를 통해 API 명세 및 테스트 가능
- Docker 환경에서 NestJS + PostgreSQL 통합 구동
- README 및 설계 문서에 구현 범위, 사용법, 테스트 방법 등 명시

## 3. 테스트 코드 작성 방침
- 각 엔드포인트별로 1개씩, 정상 동작(성공 케이스)만 확인하는 간단한 테스트
- 복잡한 예외/경계 테스트는 생략
- 테스트 프레임워크: Jest (NestJS 기본)

## 4. 문서 위치
- 본 문서: `docs/PROJECT_SCOPE.md`
- 설계 및 상세 구조: `docs/IMMUTABLE_API_DESIGN.md`, `docs/STRUCTURE.md`

---

이 문서는 프로젝트의 최종 구현 범위와 주요 운영/테스트 방침을 명확히 하기 위해 작성되었습니다.
