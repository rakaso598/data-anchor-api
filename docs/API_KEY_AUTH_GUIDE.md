# API Key 인증 및 Swagger 연동 가이드

이 문서는 환경 변수 기반의 API Key 인증을 적용하고, Swagger UI에서 자물쇠(Authorize) 버튼을 통해 인증 후 API를 사용할 수 있도록 하는 구현 방법을 안내합니다.

---

## 1. 환경 변수 설정

`.env` 파일에 아래와 같이 API 키를 추가합니다.

```
MY_API_KEY=your-very-secret-key
```

NestJS에서는 `@nestjs/config` 패키지를 통해 환경 변수를 불러올 수 있습니다.

---

## 2. API Key 인증 가드 구현

`src/common/guards/api-key.guard.ts` 파일을 생성하고 아래와 같이 작성합니다:

```typescript
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];
    const validKey = this.configService.get<string>('MY_API_KEY');
    if (!apiKey || apiKey !== validKey) {
      throw new UnauthorizedException('Invalid or missing API Key');
    }
    return true;
  }
}
```

---

## 3. 전역 가드로 등록

`main.ts`에서 아래와 같이 등록합니다:

```typescript
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { ConfigService } from '@nestjs/config';

// ...existing code...

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalGuards(new ApiKeyGuard(configService));
  // ...existing code...
}

bootstrap();
```

---

## 4. Swagger UI에서 x-api-key 입력 받기

`main.ts`에서 Swagger 설정 시 아래와 같이 추가합니다:

```typescript
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// ...existing code...

const config = new DocumentBuilder()
  .setTitle('Immutable Data API')
  .setDescription('API documentation')
  .setVersion('1.0')
  .addApiKey({
    type: 'apiKey',
    name: 'x-api-key',
    in: 'header',
  }, 'x-api-key')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

Swagger UI에서 자물쇠(Authorize) 버튼이 활성화되고, x-api-key를 입력하면 모든 요청에 자동으로 헤더가 추가됩니다.

---

## 5. 참고 사항
- API Key는 반드시 안전하게 관리하세요. (환경 변수, 비공개 저장소 등)
- 필요시 IP 화이트리스트, Rate Limiting 등 추가 보안도 고려하세요.

---

이 가이드를 따라하면, 공개된 환경에서도 본인만 API를 사용할 수 있는 인증 구조를 손쉽게 구현할 수 있습니다.
