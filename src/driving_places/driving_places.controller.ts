import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DrivingPlacesService } from './driving_places.service';
import { CreateDrivingPlaceDto } from './dto/create-driving_place.dto';
import { UpdateDrivingPlaceDto } from './dto/update-driving_place.dto';

@Controller('driving-places')
export class DrivingPlacesController {
  constructor(private readonly drivingPlacesService: DrivingPlacesService) {}

  @Post()
  create(@Body() createDrivingPlaceDto: CreateDrivingPlaceDto) {
    return this.drivingPlacesService.create(createDrivingPlaceDto);
  }

  @Get()
  findAll() {
    return this.drivingPlacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drivingPlacesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDrivingPlaceDto: UpdateDrivingPlaceDto) {
    return this.drivingPlacesService.update(+id, updateDrivingPlaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.drivingPlacesService.remove(+id);
  }
}
