import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() dto: CreateCarDto) {
    return this.carsService.createCar(dto);
  }

  @Get()
  findAll() {
    return this.carsService.getAllCars();
  }
}
