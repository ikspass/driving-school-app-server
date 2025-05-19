import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Topic } from "src/topics/topics.model";
import { Test } from "src/tests/tests.model";

interface ChapterCreateAttrs{
  name: string,
  value: string,
  topicId: number
}

@Table({tableName: 'chapters', updatedAt: false})
export class Chapter extends Model<Chapter, ChapterCreateAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;
  
  @ApiProperty({example: 'Раздел 1', description: 'Название раздела'})
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;
  
  @ApiProperty({example: 'Текст', description: 'Содержание раздела'})
  @Column({type: DataType.STRING, allowNull: false})
  declare value: string;
  
  @ApiProperty({example: '1', description: 'Идентификатор темы'})
  @ForeignKey(() => Topic)
  @Column({type: DataType.INTEGER, allowNull: false})
  declare topicId: number;

  @BelongsTo(() => Topic)
  topic: Topic;

  @ApiProperty({ example: '1', description: 'Идентификатор теста' })
  @ForeignKey(() => Test)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare testId: number;

  @BelongsTo(() => Test)
  test: Test;
}