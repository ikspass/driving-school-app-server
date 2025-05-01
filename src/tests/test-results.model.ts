import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Student } from "src/students/students.model";
import { TestEvent } from "src/test_events/test_events.model";
import { Test } from "src/tests/tests.model";

export enum StudentTestStatus{
  PASSED = 'Сдано',
  NOT_PASSED = 'Не сдано',
  FUTURE = 'В будущем'
}

@Table({tableName: 'test_results', updatedAt: false})
export class TestResult extends Model<TestResult>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  @ForeignKey(() => Student)
  @Column({type: DataType.INTEGER, allowNull: false})
  studentId: number;

  @BelongsTo(() => Student)
  student: Student;

  @ApiProperty({example: '1', description: 'Идентификатор зачёта'})
  @ForeignKey(() => Test)
  @Column({type: DataType.INTEGER, allowNull: false})
  testId: number;

  @BelongsTo(() => Test)
  test: Test;

  @ApiProperty({ example: '1', description: 'Идентификатор события теста' })
  @ForeignKey(() => TestEvent)
  @Column({ type: DataType.INTEGER, allowNull: false })
  testEventId: number;

  @BelongsTo(() => TestEvent)
  testEvent: TestEvent;

  @ApiProperty({example: 'Сдан', description: 'Статус'})
  @Column({type: DataType.ENUM(...Object.values(StudentTestStatus)), defaultValue: StudentTestStatus.FUTURE, allowNull: false})
  status: StudentTestStatus;

  @ApiProperty({example: 'Сдан', description: 'Дата'})
  @Column({type: DataType.TIME, allowNull: false})
  time: string;

  @ApiProperty({example: '2025-04-28', description: 'Время'})
  @Column({type: DataType.DATEONLY, allowNull: false})
  date: Date;

  @ApiProperty({example: '3', description: 'Количество попыток'})
  @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
  retries: number;
}