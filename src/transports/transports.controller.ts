import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { CreateTransportDto } from './dto/create-transport.dto';

@Controller('transports')
export class TransportsController {
  constructor(private readonly transportService: TransportsService) {}

  @Post()
  create(@Body() dto: CreateTransportDto) {
    return this.transportService.createTransport(dto);
  }

  @Get()
  getAll() {
    return this.transportService.getAllTransports();
  }
}
