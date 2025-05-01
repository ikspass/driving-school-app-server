import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, DataType, Column, BelongsTo, ForeignKey, HasOne } from "sequelize-typescript";
import { Instructor } from "src/instructors/instructors.model";
import { Role } from "src/roles/roles.model";
import { Student } from "src/students/students.model";
import { Teacher } from "src/teachers/teachers.model";

interface UserCreationAttrs {
  idNumber: string;
  roleValue: string
}

@Table({tableName: 'users', updatedAt: false})
export class User extends Model<User, UserCreationAttrs>{
  
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
  declare id: number;
  
  @ApiProperty({example: '123457890', description: 'Идентификационный номер паспорта'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  idNumber: string;
  
  @ApiProperty({example: '123457890', description: 'Пароль'})
  @Column({type: DataType.STRING})
  password: string;

  @ApiProperty({example: '1', description: 'Роль'})
  @ForeignKey(() => Role)
  @Column({type: DataType.INTEGER})
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasOne(() => Teacher)
  teacher: Teacher;

  @HasOne(() => Instructor)
  instructor: Instructor;

  @HasOne(() => Student)
  student: Student;
}