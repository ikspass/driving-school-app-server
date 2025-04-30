import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CategoryCreationAttrs{
    value: string,
}

@Table({tableName: 'categories', createdAt: false, updatedAt: false})
export class Category extends Model<Category, CategoryCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: 'B', description: 'Значение'})
  @Column({type: DataType.STRING, allowNull: false})
  value: string;
}