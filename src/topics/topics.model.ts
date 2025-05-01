import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Chapter } from "src/chapters/chapters.model";
import { User } from "src/users/users.model";

interface TopicCreateAttrs{
  name: string
}

@Table({tableName: 'topic', updatedAt: false})
export class Topic extends Model<Topic, TopicCreateAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;
  
  @ForeignKey(() => User)
  @ApiProperty({example: 'Тема 1', description: 'Название темы'})
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @HasMany(() => Chapter)
  chapters: Chapter;
}