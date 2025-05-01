import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { Test } from "src/tests/tests.model";

interface TestEventCreationAttrs{
  date: Date
  time: string
  groupName: string
  testId: number
}

@Table({tableName: 'test_events', updatedAt: false})
export class TestEvent extends Model<TestEvent, TestEventCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '2025-05-01', description: 'Дата'})
  @Column({type: DataType.DATEONLY, allowNull: false})
  date: Date;

  @ApiProperty({example: '18:00:00', description: 'Время'})
  @Column({type: DataType.TIME, allowNull: false, unique: true})
  time: string;

  @ApiProperty({example: '1', description: 'Идентификатор группы'})
  @ForeignKey(() => Group)
  @Column({type: DataType.INTEGER, allowNull: false})
  groupId: number;

  @BelongsTo(() => Group)
  group: Group;

  @ApiProperty({example: '1', description: 'Идентификатор зачёта'})
  @ForeignKey(() => Test)
  @Column({type: DataType.INTEGER, allowNull: false})
  testId: number;

  @BelongsTo(() => Test)
  test: Test;
}