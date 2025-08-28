import { Injectable, Inject, Logger } from '@nestjs/common';
import { PrismaClient, Record } from '../generated/prisma';

@Injectable()
export class RecordsService {
  private readonly logger = new Logger(RecordsService.name);
  constructor(@Inject('PRISMA_CLIENT') private prisma: PrismaClient) { }

  async createRecord(key: string, data: any): Promise<Record> {
    try {
      // 최신 버전 조회
      const last = await this.prisma.record.findFirst({
        where: { key },
        orderBy: { version: 'desc' },
      });
      const version = last ? last.version + 1 : 1;
      const record = await this.prisma.record.create({
        data: {
          key,
          version,
          data,
          status: 'active',
          prevHash: last?.hash || null,
          hash: null, // 해시 계산 로직 필요시 추가
        },
      });
      this.logger.log(`Record created: ${key} v${version}`);
      return record;
    } catch (e) {
      this.logger.error(`Create failed: ${e.message}`);
      throw e;
    }
  }

  async getAllLatestRecords(): Promise<Record[]> {
    try {
      // key별 최신(active) 버전만 반환
      const records = await this.prisma.record.findMany({
        where: { status: 'active' },
        orderBy: [{ key: 'asc' }, { version: 'desc' }],
      });
      // key별로 최신만 필터링
      const map = new Map();
      for (const r of records) {
        if (!map.has(r.key)) map.set(r.key, r);
      }
      return Array.from(map.values());
    } catch (e) {
      this.logger.error(`Get all failed: ${e.message}`);
      throw e;
    }
  }

  async getLatestRecord(key: string): Promise<Record | null> {
    try {
      return this.prisma.record.findFirst({
        where: { key, status: 'active' },
        orderBy: { version: 'desc' },
      });
    } catch (e) {
      this.logger.error(`Get latest failed: ${e.message}`);
      throw e;
    }
  }

  async updateRecord(key: string, data: any): Promise<Record> {
    try {
      const last = await this.getLatestRecord(key);
      if (!last) throw new Error('Record not found');
      const record = await this.prisma.record.create({
        data: {
          key,
          version: last.version + 1,
          data,
          status: 'active',
          prevHash: last.hash || null,
          hash: null,
        },
      });
      this.logger.log(`Record updated: ${key} v${last.version + 1}`);
      return record;
    } catch (e) {
      this.logger.error(`Update failed: ${e.message}`);
      throw e;
    }
  }

  async deleteRecord(key: string): Promise<Record> {
    try {
      const last = await this.getLatestRecord(key);
      if (!last) throw new Error('Record not found');
      const record = await this.prisma.record.create({
        data: {
          key,
          version: last.version + 1,
          data: last.data as any, // 타입 오류 우회
          status: 'deleted',
          prevHash: last.hash || null,
          hash: null,
        },
      });
      this.logger.log(`Record deleted: ${key} v${last.version + 1}`);
      return record;
    } catch (e) {
      this.logger.error(`Delete failed: ${e.message}`);
      throw e;
    }
  }

  async getRecordHistory(key: string): Promise<Record[]> {
    try {
      return this.prisma.record.findMany({
        where: { key },
        orderBy: { version: 'asc' },
      });
    } catch (e) {
      this.logger.error(`History failed: ${e.message}`);
      throw e;
    }
  }
}
