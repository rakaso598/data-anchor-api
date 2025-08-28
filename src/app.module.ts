import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma.module';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';

@Module({
  imports: [PrismaModule],
  controllers: [AppController, RecordsController],
  providers: [AppService, RecordsService],
})
export class AppModule { }
