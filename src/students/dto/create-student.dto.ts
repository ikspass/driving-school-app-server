import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateStudentDto {
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number

  @IsString()
  @IsNotEmpty()
  readonly categoryValue: string
}
