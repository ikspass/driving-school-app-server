import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DrivingPlacesService } from './driving_places.service';
import { CreateDrivingPlaceDto } from './dto/create-driving_place.dto';
import { UpdateDrivingPlaceDto } from './dto/update-driving_place.dto';

@Controller('driving-places')
export class DrivingPlacesController {
  constructor(private readonly drivingPlacesService: DrivingPlacesService) {}

  @Post()
  create(@Body() dto: CreateDrivingPlaceDto) {
    return this.drivingPlacesService.createDrivingPlace(dto);
  }

  @Get()
  findAll() {
    return this.drivingPlacesService.getAllDrivingPlaces();
  }
}
