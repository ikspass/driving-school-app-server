import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Car } from "src/cars/cars.model";
import { Student } from "src/students/students.model";

interface InstructorCreateAttrs{
  fullName: string,
  phoneNumber: string,
  email: string,
  dateOfEmployment: Date
  // idNumber: string
}

enum InstructorStatus {
  ACTIVE = 'Активен',
  ON_LEAVE = 'В отпуске',
  SICK_LEAVE = 'На больничном',
  FIRED = 'Более не работает'
}

@Table({tableName: 'instructors', updatedAt: false})
export class Instructor extends Model<Instructor, InstructorCreateAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
  @Column({type: DataType.INTEGER, unique: true})
  userId: number;

  @ApiProperty({example: 'Иванов Иван Иванович', description: 'ФИО'})
  @Column({type: DataType.STRING, allowNull: false})
  fullName: string;

  @ApiProperty({example: '+375291231314', description: 'Номер телефона'})
  @Column({type: DataType.STRING, allowNull: false})
  phoneNumber: string;

  @ApiProperty({example: 'ivanov@mail.ru', description: 'почта'})
  @Column({type: DataType.STRING, unique: true, allowNull: true})
  email: string;

  @ApiProperty({example: 'Более не работает', description: 'Статус'})
  @Column({type: DataType.ENUM(...Object.values(InstructorStatus)), defaultValue: InstructorStatus.ACTIVE, allowNull: false})
  status: InstructorStatus;
  
  @ApiProperty({example: '2025-04-28', description: 'Дата приёма на работу'})
  @Column({type: DataType.DATEONLY, allowNull: false})
  dateOfEmployment: Date;

  // @ApiProperty({example: '123457890', description: 'Пароль'})
  // @Column({type: DataType.STRING})
  // password: string;

  // @ApiProperty({example: '123457890', description: 'Идентификационный номер паспорта'})
  // @Column({type: DataType.STRING, unique: true})
  // idNumber: string;

  @ApiProperty({example: '1', description: 'Идентификатор автомобиля'})
  @ForeignKey(() => Car)
  @Column({type: DataType.INTEGER, allowNull: true})
  carId: number;
  
  @BelongsTo(() => Car)
  car: Car;
  
  @HasMany(() => Student)
  students: Student[];
}