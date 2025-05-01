import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Car } from './cars.model';

@Injectable()
export class CarsService {
  constructor(@InjectModel(Car) private carRepository: typeof Car) {}

  async createCar(dto: CreateCarDto) {
    const car = await this.carRepository.create(dto)
    return car;
  }

  async getAllCars() {
    const cars = await this.carRepository.findAll({include:{all: true}});
    return cars;
  }
}
