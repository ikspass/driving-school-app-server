import { IsEnum } from "class-validator";
import { TeacherStatus } from "../teachers.model";

export class UpdateStatusDto {
  @IsEnum(TeacherStatus)
  readonly status: TeacherStatus;
}
