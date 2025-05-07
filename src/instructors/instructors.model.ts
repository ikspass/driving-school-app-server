import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Car } from "src/cars/cars.model";
import { Category } from "src/categories/categories.model";
import { InstructorCategory } from "src/categories/instructor-categories.model";
import { DrivingEvent } from "src/driving_events/driving_events.model";
import { Student } from "src/students/students.model";
import { User } from "src/users/users.model";

interface InstructorCreateAttrs{
  fullName: string
  phoneNumber: string
  dateOfEmployment: Date
  dateOfBirth: Date
}

export enum InstructorStatus {
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
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, unique: true})
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({example: 'Более не работает', description: 'Статус'})
  @Column({type: DataType.ENUM(...Object.values(InstructorStatus)), defaultValue: InstructorStatus.ACTIVE, allowNull: false})
  status: InstructorStatus;
  
  @ApiProperty({example: '2025-04-28', description: 'Дата приёма на работу'})
  @Column({type: DataType.DATEONLY, allowNull: false})
  dateOfEmployment: Date;

  @ApiProperty({example: '1', description: 'Идентификатор автомобиля'})
  @ForeignKey(() => Car)
  @Column({type: DataType.INTEGER, allowNull: true})
  carId: number;
  
  @BelongsTo(() => Car)
  car: Car;
  
  @HasMany(() => Student)
  students: Student[];
  
  @HasMany(() => DrivingEvent)
  drivingEvents: DrivingEvent[];
  
  @BelongsToMany(() => Category, () => InstructorCategory)
  categories: Category[];
}