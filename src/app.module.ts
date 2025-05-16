import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { InstructorsModule } from './instructors/instructors.module';
import { GroupsModule } from './groups/groups.module';
import { TeachersModule } from './teachers/teachers.module';
import { CategoriesModule } from './categories/categories.module';
import { QualsModule } from './quals/quals.module';
import { Student } from './students/students.model';
import { Instructor } from './instructors/instructors.model';
import { Teacher } from './teachers/teachers.model';
import { Qual } from './quals/quals.model';
import { Group } from './groups/groups.model';
import { Category } from './categories/categories.model';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { User } from './users/users.model';
import { Role } from './roles/roles.model';
import { LectureEventsService } from './lecture_events/lecture_events.service';
import { LectureEventsController } from './lecture_events/lecture_events.controller';
import { LectureEventsModule } from './lecture_events/lecture_events.module';
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
import { TeacherQuals } from './teacher_quals/teacher_quals.model';
import { StudentLecture } from './student_lectures/student_lectures.model';
import { TestResult } from './test_results/test_results.model';
import { InstructorCategory } from './instructor_categories/instructor_categories.model';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/messages.model';
import { TransportsModule } from './transports/transports.module';
import { Transport } from './transports/transports.model';
import { ScheduleGroupsController } from './schedule_groups/schedule_groups.controller';
import { ScheduleGroupsService } from './schedule_groups/schedule_groups.service';
import { ScheduleGroupsModule } from './schedule_groups/schedule_groups.module';
import { ScheduleGroup } from './schedule_groups/schedule_groups.model';
import { InstructorCategoriesModule } from './instructor_categories/instructor_categories.module';
import { TeacherQualsModule } from './teacher_quals/teacher_quals.module';
import { TestResultsModule } from './test_results/test_results.module';
import { StudentLecturesModule } from './student_lectures/student_lectures.module';
import { StudentTestsModule } from './student_tests/student_tests.module';
import { StudentTest } from './student_tests/student_tests.model';
import pg from 'pg'

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      dialectModule: pg,
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        Transport,
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
        StudentTest,
        Teacher,
        TeacherQuals,
        TestEvent,
        TestResult,
        Test,
        Topic,
        User,
        Message,
        ScheduleGroup,
        StudentLecture
      ],
      autoLoadModels: true
    }),
    StudentsModule,
    InstructorsModule,
    GroupsModule,
    TeachersModule,
    TransportsModule,
    CategoriesModule,
    QualsModule,
    AuthModule,
    UsersModule,
    RolesModule,
    LectureEventsModule,
    TopicsModule,
    ChaptersModule,
    TestsModule,
    TestLessonsModule,
    DrivingEventsModule,
    DrivingPlacesModule,
    MessagesModule,
    ScheduleGroupsModule,
    InstructorCategoriesModule,
    TeacherQualsModule,
    TestResultsModule,
    StudentTestsModule,
    StudentLecturesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
