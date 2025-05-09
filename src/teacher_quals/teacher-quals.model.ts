import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { Teacher } from "src/teachers/teachers.model";
import { Qual } from "src/quals/quals.model";

interface TeacherQualCreationAttrs{
  teacherId: number
  qualId: number
}

@Table({tableName: 'teacher_quals', updatedAt: false, createdAt: false})
export class TeacherQuals extends Model<TeacherQuals, TeacherQualCreationAttrs>{
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Идентификатор квалификации'})
  @ForeignKey(() => Qual)
  @Column({type: DataType.INTEGER})
  qualId: number;

  @BelongsTo(() => Qual)
  qual: Qual;

  @ApiProperty({example: '2', description: 'Идентификатор преподавателя'})
  @ForeignKey(() => Teacher)
  @Column({type: DataType.INTEGER})
  teacherId: number;

  @BelongsTo(() => Teacher)
  teacher: Teacher;
}