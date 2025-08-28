# Immutable Data API (NestJS + PostgreSQL + Prisma)

## 프로젝트 한마디 정의
> 블록체인 불변성 원칙을 소프트웨어적으로 모사한, NestJS 기반 이력 추적형 데이터 관리 API

---

## 개요
이 프로젝트는 NestJS, PostgreSQL, Prisma ORM을 활용하여 블록체인의 "불변성"과 "이력 추적" 원칙을 소프트웨어적으로 구현한 RESTful API입니다. 데이터의 직접 수정/삭제 없이 모든 변경 이력을 안전하게 관리하며, 실용적이고 확장성 높은 구조를 제공합니다.

---

## 주요 기능
- 불변성 기반 CRUD 및 이력 관리 API
- 데이터 수정/삭제 시 새로운 버전 추가, 기존 데이터는 변경/삭제하지 않음
- key+version 구조로 모든 변경 이력 추적 가능
- prevHash/hash 필드로 체인 구조 및 무결성 검증(옵션)
- Swagger(OpenAPI) 기반 API 문서 및 테스트
- API Key 기반 인증(쓰기/수정/삭제만 보호)
- Docker/Docker Compose로 손쉬운 배포 및 운영

---

## 기술 스택
- **NestJS** (TypeScript)
- **PostgreSQL**
- **Prisma ORM**
- **Swagger (OpenAPI)**
- **Docker, Docker Compose**

---

## 엔드포인트 요약
- `POST /records` : 데이터 생성 (API Key 필요)
- `GET /records` : 전체/최신 데이터 조회
- `GET /records/:key` : 특정 데이터(최신) 조회
- `PUT/PATCH /records/:key` : 데이터 수정(새 버전 추가, API Key 필요)
- `DELETE /records/:key` : 데이터 삭제(삭제 상태 새 버전 추가, API Key 필요)
- `GET /records/:key/history` : 특정 데이터의 전체 이력 조회
- `GET /health` : 헬스체크

---

## 인증 및 보안
- **API Key 인증**: POST/PUT/PATCH/DELETE 요청 시 `x-api-key` 헤더 필수
- **Swagger UI**: Authorize(자물쇠) 버튼으로 API Key 입력 후 테스트 가능
- **.env 파일**로 민감 정보 관리, Docker Hub 이미지 비공개(Private) 권장

---

## 배포 및 실행
### 1. 로컬 개발
```bash
pnpm install
pnpm run prisma:generate # 또는 pnpm prisma generate
pnpm run start:dev
```

### 2. Docker 빌드/실행
```bash
pnpm run docker:build
pnpm run docker:tag
pnpm run docker:push
pnpm run docker:dev # (docker-compose로 전체 실행)
```

### 3. 환경 변수 예시
```
DATABASE_URL=postgresql://user:password@localhost:5432/immutable_db
MY_API_KEY=your-very-secret-key
```

---

## 문서 및 참고 자료
- [프로젝트 구조 및 핵심 기능](docs/STRUCTURE.md)
- [설계 및 데이터 모델](docs/IMMUTABLE_API_DESIGN.md)
- [스키마 설계 목적](docs/SCHEMA_DESIGN.md)
- [구현 범위 및 테스트 방침](docs/PROJECT_SCOPE.md)
- [API Key 인증/트러블슈팅](docs/API_KEY_AUTH_GUIDE.md), [docs/API_KEY_GUARD_TROUBLESHOOTING.md]
- [Docker/Prisma 트러블슈팅](docs/DOCKER_PRISMA_TROUBLESHOOTING.md)

---

## 활용 예시
- 감사 로그, 이력 관리가 필요한 서비스
- 전자문서/계약, 내부 데이터 감사, 블록체인 PoC 등

---

## 베스트 프랙티스 적용 사항
- 불변성/이력 추적 구조의 명확한 설계와 문서화
- 인증, 환경 변수, 도커 배포, Swagger 문서 등 실전 운영에 필요한 모든 요소 포함
- 트러블슈팅/운영 가이드까지 완비

---

> 실용적이고 확장성 높은 불변성 데이터 관리 시스템의 구현 예시로, 다양한 산업 분야에서 참고 및 활용이 가능합니다.
