import { IsEnum } from "class-validator";
import { StudentStatus } from 'src/students/students.model';

export class UpdateStatusDto {
  @IsEnum(StudentStatus)
  readonly status: StudentStatus;
}
