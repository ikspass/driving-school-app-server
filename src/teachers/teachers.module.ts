import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { Teacher } from './teachers.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { Qual } from 'src/quals/quals.model';
import { QualsModule } from 'src/quals/quals.module';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [
    SequelizeModule.forFeature([Teacher, Qual]),
    QualsModule
  ]
})
export class TeachersModule {}
