import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "src/students/students.model";
import { TestEvent } from "src/test_events/test_events.model";

@Table({tableName: 'student_tests', updatedAt: false})
export class StudentTest extends Model<StudentTest>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Идентификатор курсанта'})
  @ForeignKey(() => Student)
  @Column({type: DataType.INTEGER, allowNull: false})
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;

  @ApiProperty({example: '1', description: 'Идентификатор зачёта'})
  @ForeignKey(() => TestEvent)
  @Column({type: DataType.INTEGER, allowNull: false})
  testId: number;

  @BelongsTo(() => TestEvent)
  test: TestEvent;

  @ApiProperty({example: 'true', description: 'Признак посещаемости'})
  @Column({type: DataType.BOOLEAN})
  attended: boolean;
}