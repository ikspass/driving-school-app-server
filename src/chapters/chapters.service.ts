import { Injectable } from '@nestjs/common';
import { CreateChapterDto } from './dto/create-chapter.dto';
import { UpdateChapterDto } from './dto/update-chapter.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Chapter } from './chapters.model';

@Injectable()
export class ChaptersService {
  constructor(@InjectModel(Chapter) private chapterRepository: typeof Chapter) {}

  async createChapter(dto: CreateChapterDto) {
    const chapter = await this.chapterRepository.create(dto)
    return chapter;
  }

  async getAllChapters() {
    const chapters = await this.chapterRepository.findAll({include:{all: true}});
    return chapters;
  }


  async delete(id: string) {
    return this.chapterRepository.destroy({ where: { id } });
  }
}
