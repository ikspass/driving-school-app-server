import { IsNumber, IsString } from "class-validator"

export class CreateGroupDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly categoryValue: string

  @IsNumber()
  readonly teacherId: number

  @IsString()
  readonly dateOfStart: string

  @IsNumber()
  readonly scheduleGroupId: number
}
