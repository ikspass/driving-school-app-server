import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, HasOne, Model, Table, BelongsTo } from "sequelize-typescript";
import { Category } from "src/categories/categories.model";
import { Instructor } from "src/instructors/instructors.model";

interface TransportCreationAttrs{
  name: string
  sign: string
  color: string
  categoryValue: string
}

@Table({tableName: 'transports', updatedAt: false, createdAt: false})
export class Transport extends Model<Transport, TransportCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: 'Volkswagen Polo', description: 'Название'})
  @Column({type: DataType.STRING, allowNull: false})
  declare name: string;

  @ApiProperty({example: '8682 AX-3', description: 'Регистраиционный номер'})
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  declare sign: string;

  @ApiProperty({example: 'Белый', description: 'Цвет транспортного средства'})
  @Column({type: DataType.STRING, allowNull: false})
  declare color: string;

  @ApiProperty({example: '1', description: 'Идентификатор инструктора'})
  @ForeignKey(() => Instructor)
  @Column({type: DataType.INTEGER})
  declare instructorId: number | null;

  @BelongsTo(() => Instructor)
  instructor: Instructor | null;

  @ApiProperty({example: '1', description: 'Идентификатор инструктора'})
  @ForeignKey(() => Category)
  @Column({type: DataType.INTEGER})
  declare categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}