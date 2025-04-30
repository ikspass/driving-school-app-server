import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, DataType, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Group } from "src/groups/groups.model";
import { Instructor } from "src/instructors/instructors.model";

interface StudentCreationAttrs {
  fullName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  // idNumber: string;
  // groupId: number;
}

enum StudentStatus {
  ACTIVE = 'Активен',
  EXPELLED = 'Отчислен',
  GRADUATED = 'Окончил обучение',
}

@Table({tableName: 'students', updatedAt: false})
export class Student extends Model<Student, StudentCreationAttrs>{
  
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey:true})
  declare id: number;

  @ApiProperty({example: '1', description: 'Уникальный идентификатор пользователя'})
  @Column({type: DataType.INTEGER, unique: true})
  userId: number;

  @ApiProperty({example: 'Иванов Иван Иванович', description: 'ФИО'})
  @Column({type: DataType.STRING, allowNull: false})
  fullName: string;

  @ApiProperty({example: '2005-09-18', description: 'Дата рождения'})
  @Column({type: DataType.DATEONLY, allowNull: false})
  dateOfBirth: Date;

  @ApiProperty({example: '+375291231213', description: 'Номер телефона'})
  @Column({type: DataType.STRING, allowNull: false})
  phoneNumber: string;

  @ApiProperty({example: 'ivanov@mail.ru', description: 'Электронная почта'})
  @Column({type: DataType.STRING})
  email: string;

  // @ApiProperty({example: '123457890', description: 'Пароль'})
  // @Column({type: DataType.STRING})
  // password: string;

  // @ApiProperty({example: '123457890', description: 'Идентификационный номер паспорта'})
  // @Column({type: DataType.STRING, unique: true})
  // idNumber: string;
  
  @ApiProperty({example: 'Активен', description: 'Статус'})
  @Column({type: DataType.ENUM(...Object.values(StudentStatus)), defaultValue: StudentStatus.ACTIVE, allowNull: false})
  status: StudentStatus;

  @ApiProperty({example: '1', description: 'Идентификатор инструктора'})
  @ForeignKey(() => Instructor)
  @Column({type: DataType.INTEGER})
  instructorId: number;

  @BelongsTo(() => Instructor)
  instructor: Instructor;

  @ApiProperty({example: '1', description: 'Идентификатор группы'})
  @ForeignKey(() => Group)
  // @Column({type: DataType.INTEGER, allowNull: false})
  groupId: number;

  @BelongsTo(() => Group)
  group: Group
}