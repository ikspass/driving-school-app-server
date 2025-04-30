import { Injectable } from '@nestjs/common';
import { CreateQualDto } from './dto/create-qual.dto';
import { UpdateQualDto } from './dto/update-qual.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Qual } from './quals.model';

@Injectable()
export class QualsService {

  constructor(@InjectModel(Qual) private qualRepository: typeof Qual){}
  
  async createQual(dto: CreateQualDto){
    const qual = await this.qualRepository.create(dto);
    return qual;
  }

  async getQualByValue(value: string){
    const qual = await this.qualRepository.findOne({where: {value}})
    return qual;
  }
}
