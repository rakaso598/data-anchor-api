import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) { }

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

  @Put(':key')
  @Patch(':key')
  update(@Param('key') key: string, @Body() body: { data: any }) {
    return this.recordsService.updateRecord(key, body.data);
  }

  @Delete(':key')
  remove(@Param('key') key: string) {
    return this.recordsService.deleteRecord(key);
  }

  @Get(':key/history')
  history(@Param('key') key: string) {
    return this.recordsService.getRecordHistory(key);
  }
}
