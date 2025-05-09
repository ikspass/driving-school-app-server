import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ScheduleGroupCreateAttrs{
  name: string,
  minTime: string,
  maxTime: string
}

@Table({tableName: 'schedule_groups', createdAt: false, updatedAt: false})
export class ScheduleGroup extends Model<ScheduleGroup, ScheduleGroupCreateAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;
  
  @ApiProperty({example: 'Утренняя', description: 'Название группы'})
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  
  @ApiProperty({example: '8:00', description: 'Самое раннее время'})
  @Column({type: DataType.STRING, allowNull: false})
  minTime: string;

  @ApiProperty({example: '12:00', description: 'Самое позднее время'})
  @Column({type: DataType.STRING, allowNull: false})
  maxTime: string;
}