# PostgreSQL + Prisma 기반 불변성 데이터 관리(MSA) 프로젝트 설계

## 1. 개요
이 문서는 NestJS, PostgreSQL, Prisma ORM을 활용하여 블록체인의 "불변성" 원칙을 소프트웨어적으로 모사하는 RESTful API 프로젝트의 설계 및 구현 방안을 제시합니다.

## 2. 목표
- 데이터의 직접 수정/삭제 없이, 모든 변경을 새로운 버전의 레코드로 기록
- 각 데이터의 전체 변경 이력(history) 및 무결성(해시 등) 추적 가능
- NestJS 기반 MSA 구조와 Prisma ORM을 통한 효율적 데이터 관리

## 3. 데이터 모델 설계
- `Record` 테이블(예시)
  - `id`: 고유 식별자 (UUID)
  - `key`: 논리적 데이터 키(비즈니스 식별자)
  - `version`: 버전 번호(1, 2, 3...)
  - `data`: JSON 또는 기타 데이터 필드
  - `status`: 상태값 (active, deleted 등)
  - `createdAt`: 생성 시각
  - `prevHash`: 이전 버전의 해시(옵션, 무결성 추적용)
  - `hash`: 현재 데이터의 해시(옵션)

## 4. 주요 API 엔드포인트
- `POST /records` : 새 데이터 생성
- `GET /records` : 전체(또는 최신) 데이터 조회
- `GET /records/:key` : 특정 데이터(최신 버전) 조회
- `PUT/PATCH /records/:key` : 데이터 수정(새 버전 추가)
- `DELETE /records/:key` : 데이터 삭제(삭제 상태 새 버전 추가)
- `GET /records/:key/history` : 특정 데이터의 전체 이력 조회

## 5. 불변성 및 이력 관리 로직
- 데이터 수정/삭제 시 기존 레코드는 그대로 두고, 같은 key에 대해 version+1로 새 레코드 추가
- 각 버전별로 prevHash, hash를 저장해 무결성 검증 가능(옵션)
- 조회 시 status가 active인 최신 버전만 반환, history는 모든 버전 반환

## 6. 기술 스택
- NestJS (TypeScript)
- PostgreSQL
- Prisma ORM
- (테스트/운영 환경에 따라 Docker, CI/CD 등 추가 가능)

## 7. 확장 및 참고 사항
- 감사 로그, 트랜잭션 해시, 사용자 인증 등 추가 가능
- 실제 블록체인은 아니지만, 소프트웨어적으로 불변성/이력 추적을 충분히 구현 가능

---

이 문서는 프로젝트의 설계와 구현 방향성을 빠르게 파악하고, 실질적인 개발에 바로 착수할 수 있도록 작성되었습니다.
