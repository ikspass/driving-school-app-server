import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { InstructorsModule } from './instructors/instructors.module';
import { GroupsModule } from './groups/groups.module';
import { TeachersModule } from './teachers/teachers.module';
import { CarsModule } from './cars/cars.module';
import { CategoriesModule } from './categories/categories.module';
import { QualsModule } from './quals/quals.module';
import { Student } from './students/students.model';
import { Instructor } from './instructors/instructors.model';
import { Teacher } from './teachers/teachers.model';
import { Qual } from './quals/quals.model';
import { Group } from './groups/groups.model';
import { Car } from './cars/cars.model';
import { Category } from './categories/categories.model';
import { TeacherQuals } from './quals/teacher-quals.model';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Student, Instructor, Teacher, Qual, Group, Car, Category, TeacherQuals, User, Role],
      autoLoadModels: true
    }),
    StudentsModule,
    InstructorsModule,
    GroupsModule,
    TeachersModule,
    CarsModule,
    CategoriesModule,
    QualsModule,
    AuthModule,
    UsersModule,
    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
