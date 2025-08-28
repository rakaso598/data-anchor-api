import { Injectable, Inject } from '@nestjs/common';
import { PrismaClient, Record } from '../generated/prisma';

@Injectable()
export class RecordsService {
  constructor(@Inject('PRISMA_CLIENT') private prisma: PrismaClient) { }

  async createRecord(key: string, data: any): Promise<Record> {
    // 최신 버전 조회
    const last = await this.prisma.record.findFirst({
      where: { key },
      orderBy: { version: 'desc' },
    });
    const version = last ? last.version + 1 : 1;
    return this.prisma.record.create({
      data: {
        key,
        version,
        data,
        status: 'active',
        prevHash: last?.hash || null,
        hash: null, // 해시 계산 로직 필요시 추가
      },
    });
  }

  async getAllLatestRecords(): Promise<Record[]> {
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
  }

  async getLatestRecord(key: string): Promise<Record | null> {
    return this.prisma.record.findFirst({
      where: { key, status: 'active' },
      orderBy: { version: 'desc' },
    });
  }

  async updateRecord(key: string, data: any): Promise<Record> {
    const last = await this.getLatestRecord(key);
    if (!last) throw new Error('Record not found');
    return this.prisma.record.create({
      data: {
        key,
        version: last.version + 1,
        data,
        status: 'active',
        prevHash: last.hash || null,
        hash: null,
      },
    });
  }

  async deleteRecord(key: string): Promise<Record> {
    const last = await this.getLatestRecord(key);
    if (!last) throw new Error('Record not found');
    return this.prisma.record.create({
      data: {
        key,
        version: last.version + 1,
        data: last.data,
        status: 'deleted',
        prevHash: last.hash || null,
        hash: null,
      },
    });
  }

  async getRecordHistory(key: string): Promise<Record[]> {
    return this.prisma.record.findMany({
      where: { key },
      orderBy: { version: 'asc' },
    });
  }
}
