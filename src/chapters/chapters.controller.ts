import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Post()
  create(@Body() dto: CreateChapterDto) {
    return this.chaptersService.createChapter(dto);
  }

  @Get()
  findAll() {
    return this.chaptersService.getAllChapters();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.chaptersService.delete(id);
  }
}
