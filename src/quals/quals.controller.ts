import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QualsService } from './quals.service';
import { CreateQualDto } from './dto/create-qual.dto';
import { UpdateQualDto } from './dto/update-qual.dto';

@Controller('quals')
export class QualsController {
  constructor(private readonly qualsService: QualsService) {}

  @Post()
  create(@Body() dto: CreateQualDto) {
    return this.qualsService.createQual(dto);
  }

  @Get()
  getAll() {
    return this.qualsService.getAll();
  }

  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.qualsService.getQualByValue(value);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.qualsService.delete(id);
  }
}
