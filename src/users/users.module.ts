import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Instructor } from 'src/instructors/instructors.model';
import { Student } from 'src/students/students.model';
import { Teacher } from 'src/teachers/teachers.model';
import { Role } from 'src/roles/roles.model';
import { TestEvent } from 'src/test_events/test_events.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [
    RolesModule,
    forwardRef(() => AuthModule),
    SequelizeModule.forFeature([User, Instructor, Student, Teacher, Role, TestEvent])
  ],
})
export class UsersModule {}
