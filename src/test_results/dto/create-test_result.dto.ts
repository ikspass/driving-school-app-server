import { IsNumber } from "class-validator"

export class CreateTestResultDto {
  @IsNumber()
  readonly studentId: number
  @IsNumber()
  readonly testId: number
  @IsNumber()
  readonly testEventId: number
}
