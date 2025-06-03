import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";

interface MessageCreateAttrs{
  date: Date
  time: string
  text: string
  groupId: number
}

@Table({tableName: 'messages', updatedAt: false, createdAt: false})
export class Message extends Model<Message, MessageCreateAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;
  
  @ApiProperty({example: '2025-04-28', description: 'Дата'})
  @Column({ type: DataType.DATEONLY, allowNull: false })
  declare date: Date;

  @ApiProperty({example: '16:30:00', description: 'Время'})
  @Column({ type: DataType.TIME, allowNull: false })
  declare time: string;

  @ApiProperty({example: 'Преподаватель Иванов Иван Иванович на больничном', description: 'Текст'})
  @Column({ type: DataType.STRING, allowNull: false })
  declare text: string;

  @ApiProperty({example: '1', description: 'Идентификатор группы'})
  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare groupId: number;

  @BelongsTo(() => Group)
  group: Group;
}