import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Category } from "./categories.model";
import { Instructor } from "src/instructors/instructors.model";

@Table({tableName: 'instructor_categories', updatedAt: false})
export class InstructorCategory extends Model<InstructorCategory>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Идентификатор инструктора'})
  @ForeignKey(() => Instructor)
  @Column({type: DataType.INTEGER})
  instructorId: number;

  @BelongsTo(() => Instructor)
  instructor: Instructor;

  @ApiProperty({example: '2', description: 'Идентификатор категории'})
  @ForeignKey(() => Category)
  @Column({type: DataType.INTEGER})
  categoryId: number;

  @BelongsTo(() => Category)
  category: Category;
}