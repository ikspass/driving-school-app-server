import { Injectable } from '@nestjs/common';
import { CreateTransportDto } from './dto/create-transport.dto';
import { Transport } from './transports.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TransportsService {
  constructor(@InjectModel(Transport) private transportRepository: typeof Transport) {}

  async createTransport(dto: CreateTransportDto) {
    const transport = await this.transportRepository.create(dto)
    return transport;
  }

  async getAllTransports() {
    const transport = await this.transportRepository.findAll({
      order: [['id', 'ASC']],
      include: {all: true}});
    return transport;
  }
}
