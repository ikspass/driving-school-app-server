import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Teacher } from "src/teachers/teachers.model";
import { Qual } from "./quals.model";

@Table({tableName: 'teacher_quals', updatedAt: false, createdAt: false})
export class TeacherQuals extends Model<TeacherQuals>{
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Идентификатор квалификации'})
  @ForeignKey(() => Qual)
  @Column({type: DataType.INTEGER})
  qualId: number;

  @ApiProperty({example: '2', description: 'Идентификатор преподавателя'})
  @ForeignKey(() => Teacher)
  @Column({type: DataType.INTEGER})
  teacherId: number;
}