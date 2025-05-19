import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Category } from "src/categories/categories.model";
import { Chapter } from "src/chapters/chapters.model";
import { TestResult } from "../test_results/test_results.model";

interface TestCreationAttrs {
  name: string;
  description: string;
  categoryValue: string;
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

  @ApiProperty({ example: '1', description: 'Идентификатор категории' })
  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER})
  declare categoryId: number;

  @BelongsTo(() => Category)
  category: Category;

  @HasMany(() => Chapter)
  chapters: Chapter[];

  @HasMany(() => TestResult)
  testResults: TestResult[];
}