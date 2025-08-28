import { Test, TestingModule } from '@nestjs/testing';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';

describe('RecordsController', () => {
  let controller: RecordsController;
  let service: RecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordsController],
      providers: [
        {
          provide: RecordsService,
          useValue: {
            createRecord: jest.fn().mockResolvedValue({ key: 'test', version: 1, data: {}, status: 'active', createdAt: new Date() }),
            getAllLatestRecords: jest.fn().mockResolvedValue([]),
            getLatestRecord: jest.fn().mockResolvedValue(null),
            updateRecord: jest.fn().mockResolvedValue({}),
            deleteRecord: jest.fn().mockResolvedValue({}),
            getRecordHistory: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();
    controller = module.get<RecordsController>(RecordsController);
    service = module.get<RecordsService>(RecordsService);
  });

  it('should create a record', async () => {
    expect(await controller.create({ key: 'test', data: {} })).toHaveProperty('key', 'test');
  });

  it('should get all latest records', async () => {
    expect(await controller.findAll()).toEqual([]);
  });

  it('should get a record by key', async () => {
    expect(await controller.findOne('test')).toBeNull();
  });

  it('should update a record', async () => {
    expect(await controller.update('test', { data: {} })).toBeDefined();
  });

  it('should delete a record', async () => {
    expect(await controller.remove('test')).toBeDefined();
  });

  it('should get record history', async () => {
    expect(await controller.history('test')).toEqual([]);
  });
});
