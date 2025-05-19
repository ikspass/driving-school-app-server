import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { DrivingEvent } from "src/driving_events/driving_events.model";

interface DrivingPlaceCreationAttrs{
  value: string
  description: string
}

@Table({tableName: 'driving_places', updatedAt: false})
export class DrivingPlace extends Model<DrivingPlace, DrivingPlaceCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: 'autodrome', description: 'Значение'})
  @Column({type: DataType.STRING, allowNull: false})
  declare value: string;

  @ApiProperty({example: 'Автодром', description: 'Описание'})
  @Column({type: DataType.STRING, allowNull: false})
  declare description: string;

  @HasMany(() => DrivingEvent)
  drivingEvents: DrivingEvent[];
}