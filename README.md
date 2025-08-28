# Immutable Data API (NestJS + PostgreSQL + Prisma)

## 프로젝트 소개
이 프로젝트는 블록체인의 "불변성(Immutability)" 원칙을 소프트웨어적으로 모사하여, 데이터의 직접 수정/삭제 없이 모든 변경 이력을 안전하게 관리할 수 있는 RESTful API를 제공합니다. NestJS, PostgreSQL, Prisma ORM을 활용하여 설계 및 구현되었습니다.

## 구축 의도 및 배경
- **데이터 무결성**과 **이력 추적**은 금융, 의료, 공공 기록 등 다양한 분야에서 매우 중요합니다.
- 블록체인 기술의 불변성 원칙은 신뢰성과 투명성을 보장하지만, 실제 블록체인 도입은 복잡성과 비용이 큽니다.
- 본 프로젝트는 기존 데이터베이스(PostgreSQL)와 현대적 ORM(Prisma)을 활용해, 블록체인 없이도 불변성/이력 추적 구조를 구현하는 실용적 대안을 제시합니다.

## 주요 목표
- 데이터의 직접 수정/삭제 없이, 모든 변경을 새로운 버전의 레코드로 기록
- 각 데이터의 전체 변경 이력(history) 및 무결성(해시 등) 추적 가능
- NestJS 기반의 확장성 높은 MSA 구조와 Prisma ORM을 통한 효율적 데이터 관리

## 기술 스택
- **NestJS** (TypeScript 기반 백엔드 프레임워크)
- **PostgreSQL** (관계형 데이터베이스)
- **Prisma ORM** (타입 안전 데이터베이스 접근)
- (테스트/운영 환경에 따라 Docker, CI/CD 등 추가 가능)

## 활용 예시
- **감사 로그 및 이력 관리**: 데이터 변경 이력의 투명한 관리가 필요한 모든 서비스
- **전자문서/계약 관리**: 문서의 변경 이력과 무결성 증명이 필요한 시스템
- **내부 데이터 감사**: 데이터 조작 방지 및 추적이 필요한 기업 내부 시스템
- **블록체인 도입 전 단계의 PoC**: 블록체인 도입 전, 불변성 구조의 사전 검증

## 문서
- 설계 및 구현 상세: `docs/IMMUTABLE_API_DESIGN.md`
- 프로젝트 구조 및 기능: `docs/STRUCTURE.md`

---

이 프로젝트는 실용적이고 확장성 높은 불변성 데이터 관리 시스템의 구현 예시로, 다양한 산업 분야에서 참고 및 활용이 가능합니다.

---

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
