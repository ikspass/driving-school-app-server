import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ScheduleGroupCreateAttrs{
  name: string,
}

@Table({tableName: 'schedule_groups', createdAt: false, updatedAt: false})
export class ScheduleGroup extends Model<ScheduleGroup, ScheduleGroupCreateAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;
  
  @ApiProperty({example: 'Утренняя', description: 'Название группы'})
  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;
}