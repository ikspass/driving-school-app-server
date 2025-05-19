import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/categories/categories.model";
import { InstructorCategory } from "src/instructor_categories/instructor_categories.model";
import { DrivingEvent } from "src/driving_events/driving_events.model";
import { Student } from "src/students/students.model";
import { Transport } from "src/transports/transports.model";
import { User } from "src/users/users.model";

interface InstructorCreateAttrs{
  userId: number
  dateOfEmployment: string
}

@Table({tableName: 'instructors', updatedAt: false})
export class Instructor extends Model<Instructor, InstructorCreateAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
  @ForeignKey(() => User)
  @Column({type: DataType.INTEGER, unique: true})
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({example: 'Более не работает', description: 'Статус'})
  @Column({type: DataType.STRING, defaultValue: 'Не активен', allowNull: false})
  declare status: string;
  
  @ApiProperty({example: '2025-04-28', description: 'Дата приёма на работу'})
  @Column({type: DataType.STRING, allowNull: false})
  declare dateOfEmployment: string;
  
  @HasMany(() => Transport)
  transports: Transport[];
  
  @HasMany(() => Student)
  students: Student[];
  
  @HasMany(() => DrivingEvent)
  drivingEvents: DrivingEvent[];
  
  @BelongsToMany(() => Category, () => InstructorCategory)
  categories: Category[];
}