import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { InstructorCategory } from "./instructor-categories.model";
import { Instructor } from "src/instructors/instructors.model";
import { Test } from "src/tests/tests.model";

interface CategoryCreationAttrs{
  value: string,
  description: string
}

@Table({tableName: 'categories', createdAt: false, updatedAt: false})
export class Category extends Model<Category, CategoryCreationAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: 'B', description: 'Значение'})
  @Column({type: DataType.STRING, allowNull: false})
  value: string;

  @ApiProperty({example: 'Легковые автомобили до 3,5 тонн', description: 'Описание'})
  @Column({type: DataType.STRING, allowNull: false})
  description: string;
  
  @BelongsToMany(() => Instructor, () => InstructorCategory)
  instructors: Instructor[]

  @HasMany(() => Group)
  groups: Group[];

  @HasMany(() => Test)
  tests: Test[]
}