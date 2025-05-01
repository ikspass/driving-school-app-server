import { IsEnum } from "class-validator";
import { InstructorStatus } from "../instructors.model";

export class UpdateStatusDto {
  @IsEnum(InstructorStatus)
  readonly status: InstructorStatus;
}
