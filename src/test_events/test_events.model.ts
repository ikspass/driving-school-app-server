import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { Test } from "src/tests/tests.model";

interface TestEventCreationAttrs{
  date: string
  time: string
  groupId: number
}

@Table({tableName: 'test_events', updatedAt: false, createdAt: false})
export class TestEvent extends Model<TestEvent, TestEventCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '2025-05-01', description: 'Дата'})
  @Column({type: DataType.STRING, allowNull: false})
  declare date: string;

  @ApiProperty({example: '18:00:00', description: 'Время'})
  @Column({type: DataType.STRING, allowNull: false})
  declare time: string;

  @ApiProperty({example: '1', description: 'Идентификатор группы'})
  @ForeignKey(() => Group)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare groupId: number;

  @BelongsTo(() => Group)
  group: Group;

  @ApiProperty({example: '1', description: 'Идентификатор теста'})
  @ForeignKey(() => Test)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare testId: number;

  @BelongsTo(() => Test)
  test: Test;

  @ApiProperty({example: 'В будущем', description: 'Статус зачёта'})
  @Column({type: DataType.STRING, defaultValue: 'В будущем'})
  declare status: string;
}