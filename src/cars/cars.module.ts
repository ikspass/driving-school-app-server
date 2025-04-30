import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './cars.model';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [
    SequelizeModule.forFeature([Car])
  ]
})
export class CarsModule {}
