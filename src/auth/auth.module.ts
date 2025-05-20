import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { InstructorsModule } from 'src/instructors/instructors.module';
import { StudentsModule } from 'src/students/students.module';
import { TeachersModule } from 'src/teachers/teachers.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule), RolesModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET',
      signOptions:{
        expiresIn: '24h'
      }
    }),
    SequelizeModule.forFeature([User]),
    InstructorsModule,
    StudentsModule,
    TeachersModule
  ],
  exports: [
    AuthService, JwtModule
  ]
})
export class AuthModule {}
