import { PartialType } from '@nestjs/swagger';
import { CreateStudentLectureDto } from './create-student_lecture.dto';

export class UpdateStudentLectureDto extends PartialType(CreateStudentLectureDto) {}
