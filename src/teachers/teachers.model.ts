import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { LectureEvent } from "src/lecture_events/lecture_events.model";
import { Qual } from "src/quals/quals.model";
import { TeacherQuals } from "src/quals/teacher-quals.model";
import { User } from "src/users/users.model";

interface TeacherCreateAttrs{
  fullName: string,
  phoneNumber: string,
  dateOfEmployment: Date,
}

export enum TeacherStatus {
  ACTIVE = 'Активен',
  ON_LEAVE = 'В отпуске',
  SICK_LEAVE = 'На больничном',
  FIRED = 'Более не работает'
}

@Table({tableName: 'teachers', updatedAt: false})
export class Teacher extends Model<Teacher, TeacherCreateAttrs>{

  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;
  
  @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;
  
  @ApiProperty({example: 'Иванов Иван Иванович', description: 'ФИО'})
  @Column({type: DataType.STRING, allowNull: false})
  fullName: string;

  @ApiProperty({example: '+375291231314', description: 'Номер телефона'})
  @Column({type: DataType.STRING, allowNull: false})
  phoneNumber: string;

  @ApiProperty({example: '2025-04-28', description: 'Дата приёма на работу'})
  @Column({type: DataType.DATEONLY, allowNull: false})
  dateOfEmployment: Date;

  @ApiProperty({example: 'В отпуске', description: 'Статус'})
  @Column({type: DataType.ENUM(...Object.values(TeacherStatus)), defaultValue: TeacherStatus.ACTIVE, allowNull: false})
  status: TeacherStatus;

  @BelongsToMany(() => Qual, () => TeacherQuals)
  quals: Qual[];

  @HasMany(() => Group)
  groups: Group[];

  @HasMany(() => LectureEvent)
  lectureLessons: LectureEvent[];
}