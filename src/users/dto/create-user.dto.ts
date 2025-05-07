import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: '121212121212', description: 'Идентификационный номер'})
  @IsString({message: 'Должно быть строкой'})
  @Length(14, 14, {message: 'Должно быть 14 символов'})

  readonly idNumber: string;
  @ApiProperty({example: 'student', description: 'Знаачение роли'})
  @IsString({message: 'Должно быть строкой'})
  readonly roleValue: string;
}
