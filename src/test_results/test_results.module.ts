import { Module } from '@nestjs/common';
import { TestResultsService } from './test_results.service';
import { TestResultsController } from './test_results.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestResult } from './test_results.model';
import { Test } from 'src/tests/tests.model';
import { Student } from 'src/students/students.model';
import { TestEvent } from 'src/test_events/test_events.model';

@Module({
  controllers: [TestResultsController],
  providers: [TestResultsService],
  imports: [
    SequelizeModule.forFeature([TestResult, Student, Test, TestEvent]),
  ]
})
export class TestResultsModule {}
