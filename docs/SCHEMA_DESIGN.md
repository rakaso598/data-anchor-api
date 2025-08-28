# Record 스키마 설계 목적 및 방향

```Typescript
model Record {
  id        String   @id @default(uuid())
  key       String
  version   Int
  data      Json
  status    String   // e.g. 'active', 'deleted'
  createdAt DateTime @default(now())
  prevHash  String?  // optional, for integrity
  hash      String?  // optional, for integrity

  @@index([key, version])
}

```

## 1. 설계 목적
- **불변성(Immutability)**: 기존 데이터를 직접 수정/삭제하지 않고, 모든 변경을 새로운 버전의 레코드로 남김으로써 데이터의 불변성을 보장합니다.
- **이력 추적(History Tracking)**: 각 데이터(key)에 대한 모든 변경 이력을 체계적으로 관리하여, 언제든 과거 상태를 조회하거나 변경 내역을 검증할 수 있습니다.
- **무결성(Integrity) 모사**: prevHash, hash 필드를 통해 각 버전이 체인처럼 연결된 구조를 흉내내어, 데이터 위변조 여부를 소프트웨어적으로 검증할 수 있도록 설계합니다.
- **실용성 및 확장성**: RDBMS 환경에서 관리/확장/운영이 쉽고, 다양한 비즈니스 요구에 맞게 확장 가능한 구조를 지향합니다.

## 2. 설계 방향
- **버전 관리**: key+version 조합으로 각 데이터의 모든 상태를 별도 레코드로 저장
- **상태값 관리**: status(active, deleted 등)로 데이터의 논리적 상태를 구분
- **타임스탬프**: createdAt으로 각 버전의 생성 시점 기록
- **무결성 필드**: prevHash(이전 버전 해시), hash(현재 버전 해시)로 체인 구조 모사(필요시 해시 연산 추가 가능)
- **확장성**: 감사 로그, 사용자 정보, 추가 메타데이터 등 다양한 확장 가능

## 3. 실제 블록체인과의 차이
- 분산합의, 서명, 트랜잭션 등은 포함하지 않음
- 단일 DB 환경에서 불변성/이력 추적만 소프트웨어적으로 모사
- 실용성과 관리 편의성을 우선시

---

이 스키마는 블록체인의 핵심 원리(불변성, 이력 추적)를 RDBMS 환경에서 최대한 실용적으로 구현하기 위한 설계임을 명확히 합니다.
