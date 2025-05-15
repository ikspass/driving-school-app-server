import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { LectureEvent } from "src/lecture_events/lecture_events.model";
import { Qual } from "src/quals/quals.model";
import { TeacherQuals } from "src/teacher_quals/teacher_quals.model";
import { User } from "src/users/users.model";

interface TeacherCreateAttrs{
  userId: number
  dateOfEmployment: string
}

@Table({tableName: 'teachers', updatedAt: false})
export class Teacher extends Model<Teacher, TeacherCreateAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;
  
  @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({example: '2025-04-28', description: 'Дата приёма на работу'})
  @Column({type: DataType.DATEONLY, allowNull: false})
  declare dateOfEmployment: Date;

  @ApiProperty({example: 'В отпуске', description: 'Статус'})
  @Column({type: DataType.STRING, defaultValue: 'Не активен', allowNull: false})
  declare status: string;

  @BelongsToMany(() => Qual, () => TeacherQuals)
  quals: Qual[];

  @HasMany(() => Group)
  groups: Group[];

  @HasMany(() => LectureEvent)
  lectureLessons: LectureEvent[];
}