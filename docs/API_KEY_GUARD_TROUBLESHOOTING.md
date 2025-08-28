# NestJS API Key Guard 부분 적용 트러블슈팅 가이드

## 문제 상황
- API Key 인증을 전역(Global Guard)으로 적용하면, 헬스체크(`/health`)와 데이터 조회(GET) 등 인증이 필요 없는 엔드포인트까지 모두 인증을 요구하게 됨
- 이로 인해 Swagger, curl 등에서 GET/헬스체크 요청도 401 에러가 발생함

## 해결 방안: Guard를 엔드포인트별로 선택 적용

### 1. 인증이 필요한 엔드포인트에만 Guard 적용
- `@UseGuards(ApiKeyGuard)`를 POST, PUT, PATCH, DELETE 메서드에만 붙임
- 인증이 필요 없는 GET, /health 등에는 아무것도 붙이지 않음

#### 예시 코드 (RecordsController)
```typescript
import { UseGuards, Controller, Post, Put, Patch, Delete, Get, Param, Body } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body() body: { key: string; data: any }) {
    return this.recordsService.createRecord(body.key, body.data);
  }

  @Get()
  findAll() {
    return this.recordsService.getAllLatestRecords();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.recordsService.getLatestRecord(key);
  }

  @UseGuards(ApiKeyGuard)
  @Put(':key')
  @Patch(':key')
  update(@Param('key') key: string, @Body() body: { data: any }) {
    return this.recordsService.updateRecord(key, body.data);
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.recordsService.deleteRecord(key);
  }

  @Get(':key/history')
  history(@Param('key') key: string) {
    return this.recordsService.getRecordHistory(key);
  }
}
```

### 2. AppController의 /health, / 등에는 Guard 미적용
- 별도 인증 없이 누구나 접근 가능

### 3. 전역 가드 제거
- `main.ts`에서 `app.useGlobalGuards(new ApiKeyGuard(...))` 부분을 제거

---

이렇게 하면 인증이 필요한 엔드포인트(CUD)에서만 API Key를 요구하고, 나머지(GET, /health 등)는 자유롭게 접근할 수 있습니다.

이 방식이 NestJS에서 가장 명확하고 권장되는 베스트 프랙티스입니다.
