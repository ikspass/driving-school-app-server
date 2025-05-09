import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({example: '121212121212', description: 'Идентификационный номер'})
  @IsString({message: 'Должно быть строкой'})
  @Length(14, 14, {message: 'Должно быть 14 символов'})
  readonly idNumber: string;

  @ApiProperty({example: 'student', description: 'Значение роли'})
  readonly roleValue: string;

  @ApiProperty({example: '123456789', description: 'Номер паспорта'})
  @IsString({message: 'Должно быть строкой'})
  @Length(9, 9, {message: 'Должно быть 9 символов'})
  readonly passportNumber: string;

  @ApiProperty({example: '0', description: 'Номер телефона'})
  @IsString({message: 'Должно быть строкой'})
  @Length(13, 13, {message: 'Должно быть 13 символов'})
  readonly phoneNumber: string;

  @ApiProperty({example: '0', description: 'Прописка'})
  @IsString({message: 'Должно быть строкой'})
  readonly adress: string;

  @ApiProperty({example: '0', description: 'ФИО'})
  @IsString({message: 'Должно быть строкой'})
  readonly fullName: string;

  @ApiProperty({example: '0', description: 'Дата рождения'})
  @IsString({message: 'Должно быть строкой'})
  @Length(10, 10, {message: 'Должно быть 10 символов'})
  readonly dateOfBirth: string;

  img: string;
}
