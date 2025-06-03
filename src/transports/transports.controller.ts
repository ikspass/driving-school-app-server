import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Get(':id')
  getTransportById(@Param('id') id: number) {
    return this.transportService.getTransportById(id);
  }

  @Patch(':id/instructor/:instructorId')
  updateTransportInstructor(@Param('id') id: number, @Param('instructorId') instructorId: number) {
    return this.transportService.updateTransportInstructor(id, instructorId);
  }

  @Delete(':id')
  deleteTransport(@Param('id') id: string) {
    return this.transportService.deleteTransport(id);
  }
}
