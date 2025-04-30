import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface RoleCreationAttrs{
  value: string,
  description: string,
}

@Table({tableName: 'roles', updatedAt: false, createdAt: false})
export class Role extends Model<Role, RoleCreationAttrs>{
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  declare id: number;

  @ApiProperty({example: 'STUDENT', description: 'Роль'})
  @Column({type: DataType.STRING, allowNull: false})
  value: string;

  @ApiProperty({example: 'Курсант', description: 'Описание роли'})
  @Column({type: DataType.STRING, allowNull: false})
  description: string;
}