import { Module } from '@nestjs/common';
import { TransportsService } from './transports.service';
import { TransportsController } from './transports.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transport } from './transports.model';
import { Instructor } from 'src/instructors/instructors.model';
import { InstructorsModule } from 'src/instructors/instructors.module';

@Module({
  providers: [TransportsService],
  controllers: [TransportsController],
  imports: [
    SequelizeModule.forFeature([Transport, Instructor]),
    InstructorsModule
  ]
})
export class TransportsModule {}
