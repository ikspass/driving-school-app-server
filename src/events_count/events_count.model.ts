import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Topic } from "src/topics/topics.model";
import { Test } from "src/tests/tests.model";

interface EventsCountCreateAttrs{
  event: string,
  count: number,
}

@Table({tableName: 'events_count', updatedAt: false, createdAt: false})
export class EventsCount extends Model<EventsCount, EventsCountCreateAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;
  
  @ApiProperty({example: 'driving_event', description: 'Название события'})
  @Column({ type: DataType.STRING, allowNull: false })
  declare event: string;
  
  @ApiProperty({example: 'Вождение', description: 'Описание события'})
  @Column({ type: DataType.STRING})
  declare description: string;
  
  @ApiProperty({example: '20', description: 'Количество'})
  @Column({type: DataType.INTEGER, allowNull: false})
  declare count: number;
}