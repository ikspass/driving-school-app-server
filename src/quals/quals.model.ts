import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Teacher } from "src/teachers/teachers.model";
import { TeacherQuals } from "src/teacher_quals/teacher_quals.model";

interface QualCreationAttrs{
  value: string,
  description: string,
}

@Table({tableName: 'quals', updatedAt: false, createdAt: false})
export class Qual extends Model<Qual, QualCreationAttrs>{
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: 'Преподаватель теории', description: 'Квалификация'})
  @Column({type: DataType.STRING, allowNull: false})
  declare value: string;

  @ApiProperty({example: 'Может проводить лекции', description: 'Описание квалификации'})
  @Column({type: DataType.STRING, allowNull: false})
  declare description: string;

  @BelongsToMany(() => Teacher, () => TeacherQuals)
  teachers: Teacher[];
}