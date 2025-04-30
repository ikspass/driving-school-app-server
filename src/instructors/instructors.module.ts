import { Module } from '@nestjs/common';
import { InstructorsService } from './instructors.service';
import { InstructorsController } from './instructors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Instructor } from './instructors.model';

@Module({
  controllers: [InstructorsController],
  providers: [InstructorsService],
  imports: [
    SequelizeModule.forFeature([Instructor])
  ]
})
export class InstructorsModule {}
