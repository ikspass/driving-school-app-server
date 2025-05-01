import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { DrivingPlace } from "src/driving_places/driving_places.model";
import { Instructor } from "src/instructors/instructors.model";
import { Student } from "src/students/students.model";

interface DrivingEventCreationAttrs{
  date: Date
  time: string
  instructorId: number
  studentId: number
  placeId: number
}

@Table({tableName: 'driving_events', updatedAt: false})
export class DrivingEvent extends Model<DrivingEvent, DrivingEventCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '2025-05-01', description: 'Дата'})
  @Column({type: DataType.DATEONLY, allowNull: false})
  date: Date;

  @ApiProperty({example: '18:00:00', description: 'Время'})
  @Column({type: DataType.TIME, allowNull: false, unique: true})
  time: string;

  @ApiProperty({example: '1', description: 'Идентификатор инструктора'})
  @ForeignKey(() => Instructor)
  @Column({type: DataType.INTEGER, allowNull: false})
  instructorId: number;

  @BelongsTo(() => Instructor)
  instructor: Instructor;

  @ApiProperty({example: '1', description: 'Идентификатор курсанта'})
  @ForeignKey(() => Student)
  @Column({type: DataType.INTEGER, allowNull: false})
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;

  @ApiProperty({example: '1', description: 'Идентификатор локации'})
  @ForeignKey(() => DrivingPlace)
  @Column({type: DataType.INTEGER, allowNull: false})
  placeId: number;
  
  @BelongsTo(() => DrivingPlace)
  place: DrivingPlace;
}