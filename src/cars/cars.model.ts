import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasOne, Model, Table } from "sequelize-typescript";
import { Instructor } from "src/instructors/instructors.model";

interface CarCreationAttrs{
  name: string
  sign: string
  color: string
}

enum CarStatus {
  ACTIVE = 'Активен',
  IN_REPAIR = 'В ремонте',
  SOLD = 'Более не используется'
}

@Table({tableName: 'cars', updatedAt: false})
export class Car extends Model<Car, CarCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: 'Volkswagen Polo', description: 'Название'})
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @ApiProperty({example: '8682 AX-3', description: 'Номер'})
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  sign: string;

  @ApiProperty({example: 'Белый', description: 'Цвет автомобиля'})
  @Column({type: DataType.STRING, allowNull: false})
  color: string;

  @ApiProperty({example: 'В ремонте', description: 'Статус'})
  @Column({type: DataType.ENUM(...Object.values(CarStatus)), defaultValue: CarStatus.ACTIVE, allowNull: false})
  status: CarStatus;

  @HasOne(() => Instructor)
  instructor: Instructor;
}