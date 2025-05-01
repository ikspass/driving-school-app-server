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
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { LectureEventsService } from './lecture_events/lecture_events.service';
import { LectureEventsController } from './lecture_events/lecture_events.controller';
import { LectureLessonsModule } from './lecture_events/lecture_events.module';
import { DrivingPlacesModule } from './driving_places/driving_places.module';
import { DrivingEventsModule } from './driving_events/driving_events.module';
import { TestLessonsModule } from './test_events/test_events.module';
import { TestsModule } from './tests/tests.module';
import { ChaptersModule } from './chapters/chapters.module';
import { TopicsModule } from './topics/topics.module';
import { Chapter } from './chapters/chapters.model';
import { DrivingEvent } from './driving_events/driving_events.model';
import { DrivingPlace } from './driving_places/driving_places.model';
import { LectureEvent } from './lecture_events/lecture_events.model';
import { TestEvent } from './test_events/test_events.model';
import { Test } from './tests/tests.model';
import { Topic } from './topics/topics.model';
import { TeacherQuals } from './quals/teacher-quals.model';
import { StudentLecture } from './lecture_events/student-lectures.model';
import { StudentTest } from './tests/student-tests.model';
import { TestResult } from './tests/test-results.model';
import { InstructorCategory } from './categories/instructor-categories.model';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/messages.model';

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
      models: [
        Car,
        Category,
        Chapter,
        DrivingEvent,
        DrivingPlace,
        Group,
        Instructor,
        InstructorCategory,
        LectureEvent,
        Qual,
        Role,
        Student,
        StudentLecture,
        StudentTest,
        Teacher,
        TeacherQuals,
        TestEvent,
        TestResult,
        Test,
        Topic,
        User,
        Message
      ],
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
    LectureLessonsModule,
    TopicsModule,
    ChaptersModule,
    TestsModule,
    TestLessonsModule,
    DrivingEventsModule,
    DrivingPlacesModule,
    MessagesModule,
  ],
  controllers: [LectureEventsController],
  providers: [LectureEventsService],
})
export class AppModule {}
