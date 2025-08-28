import { Global, Module } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';

@Global()
@Module({
  providers: [
    {
      provide: 'PRISMA_CLIENT',
      useValue: new PrismaClient(),
    },
  ],
  exports: ['PRISMA_CLIENT'],
})
export class PrismaModule { }
