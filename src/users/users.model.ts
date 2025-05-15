import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, DataType, Column, BelongsTo, ForeignKey, HasOne } from "sequelize-typescript";
import { Instructor } from "src/instructors/instructors.model";
import { Role } from "src/roles/roles.model";
import { Student } from "src/students/students.model";
import { Teacher } from "src/teachers/teachers.model";

interface UserCreationAttrs {
  idNumber: string;
  passportNumber: string;
  phoneNumber: string;
  roleValue: string;
  adress:  string;
  fullName: string;
  dateOfBirth: string;
  img: string
}

@Table({tableName: 'users', updatedAt: false})
export class User extends Model<User, UserCreationAttrs>{
  
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
  declare id: number;
  
  @ApiProperty({example: '123457890', description: 'Идентификационный номер паспорта'})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  declare idNumber: string;
  
  @ApiProperty({example: 'MC123457890', description: 'Номер паспорта'})
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  declare passportNumber: string;
  
  @ApiProperty({example: '+375291231232', description: 'Номер телефона'})
  @Column({type: DataType.STRING, allowNull: false})
  declare phoneNumber: string;
  
  @ApiProperty({example: '123457890', description: 'Пароль'})
  @Column({type: DataType.STRING})
  declare password: string;
  
  @ApiProperty({example: 'г. Минск, ул. Савицкого, 30-105', description: 'Прописка'})
  @Column({type: DataType.STRING, allowNull: false})
  declare adress: string;
  
  @ApiProperty({example: 'Иванов Иван Иванович', description: 'ФИО'})
  @Column({type: DataType.STRING, allowNull: false})
  declare fullName: string;
  
  @ApiProperty({example: '2000-09-10', description: 'Дата рождения'})
  @Column({type: DataType.STRING, allowNull: false})
  declare dateOfBirth: string;

  @ApiProperty({example: 'Фото', description: 'Фото'})
  @Column({type: DataType.STRING, defaultValue: ''})
  declare img: string;

  @ApiProperty({example: '1', description: 'Роль'})
  @ForeignKey(() => Role)
  @Column({type: DataType.INTEGER})
  declare roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasOne(() => Teacher)
  teacher: Teacher;

  @HasOne(() => Instructor)
  instructor: Instructor;

  @HasOne(() => Student)
  student: Student;
}