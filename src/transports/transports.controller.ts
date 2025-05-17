import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Delete(':id')
  deleteTransport(@Param('id') id: string) {
    return this.transportService.deleteTransport(id);
  }
}
