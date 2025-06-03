import { IsBoolean, IsNumber } from "class-validator"

export class CreateStudentLectureDto {
  @IsNumber()
  readonly studentId: number
  @IsNumber()
  readonly lectureId: number
  @IsBoolean()
  readonly attended: boolean
}
