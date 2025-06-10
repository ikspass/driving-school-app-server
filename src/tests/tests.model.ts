import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";

interface TestCreationAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'tests', updatedAt: false, createdAt: false })
export class Test extends Model<Test, TestCreationAttrs> {

  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true })
  declare id: number;

  @ApiProperty({ example: 'Зачёт 1', description: 'Название зачёта' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true})
  declare name: string;

  @ApiProperty({ example: 'Зачёт по теории', description: 'Описание зачёта' })
  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;
}