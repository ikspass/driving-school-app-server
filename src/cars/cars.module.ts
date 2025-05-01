import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Car } from './cars.model';
import { InstructorsModule } from 'src/instructors/instructors.module';
import { Instructor } from 'src/instructors/instructors.model';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [
    SequelizeModule.forFeature([Car, Instructor]),
    InstructorsModule
  ]
})
export class CarsModule {}
