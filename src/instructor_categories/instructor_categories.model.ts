import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "../categories/categories.model";
import { Instructor } from "src/instructors/instructors.model";

interface InstructorCategoryCreationAttrs{
  instructorId: number
  categoryId: number
}

@Table({tableName: 'instructor_categories', createdAt: false, updatedAt: false})
export class InstructorCategory extends Model<InstructorCategory, InstructorCategoryCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Идентификатор инструктора'})
  @ForeignKey(() => Instructor)
  @Column({type: DataType.INTEGER})
  declare instructorId: number;

  @BelongsTo(() => Instructor)
  instructor: Instructor;

  @ApiProperty({example: '2', description: 'Идентификатор категории'})
  @ForeignKey(() => Category)
  @Column({type: DataType.INTEGER})
  declare categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}