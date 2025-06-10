import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "src/students/students.model";
import { TestEvent } from "src/test_events/test_events.model";

interface StudentTestCreatioAttrs{
  studentId: number
  testId: number
  attended: boolean
  passed: boolean
}

@Table({tableName: 'student_tests', createdAt: false, updatedAt: false})
export class StudentTest extends Model<StudentTest, StudentTestCreatioAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Идентификатор курсанта'})
  @ForeignKey(() => Student)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare studentId: number;

  @BelongsTo(() => Student)
  student: Student;

  @ApiProperty({example: '1', description: 'Идентификатор зачёта'})
  @ForeignKey(() => TestEvent)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare testEventId: number;

  @BelongsTo(() => TestEvent)
  testEvent: TestEvent;
  
  @ApiProperty({example: 'true', description: 'Зачёт сдан?'})
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  declare passed: boolean;

  @ApiProperty({example: 'true', description: 'Признак посещаемости'})
  @Column({type: DataType.BOOLEAN})
  declare attended: boolean;
}