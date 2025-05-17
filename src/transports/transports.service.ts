import { Injectable } from '@nestjs/common';
import { CreateTransportDto } from './dto/create-transport.dto';
import { Transport } from './transports.model';
import { InjectModel } from '@nestjs/sequelize';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class TransportsService {
  constructor(@InjectModel(Transport)
    private transportRepository: typeof Transport,
    private categoryService: CategoriesService
  ) {}

  async createTransport(dto: CreateTransportDto) {
    const transport = await this.transportRepository.create(dto)
    const category = await this.categoryService.getCategoryByValue(dto.categoryValue)
    if(category){
      await transport.$set('category', category.id)
      transport.category = category;
      await transport.save();
    }
    return transport;
  }

  async getAllTransports() {
    const transport = await this.transportRepository.findAll({
      order: [['id', 'ASC']],
      include: {all: true}});
    return transport;
  }

  async deleteTransport(id: string) {
    return this.transportRepository.destroy({ where: { id } });
  }
}
