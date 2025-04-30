import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User)
    private userRepository: typeof User,
    private roleService: RolesService
  ){}

  async createUser(dto: CreateUserDto){
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue(dto.roleValue);
    if(role){
      await user.$set('role', [role.id])
      user.roleId = role.id;
      user.role = role;
      await user.save();
    }
    return user;
  }

  async getAllUsers(){
    const users = await this.userRepository.findAll({include: {all: true}});
    return users;
  }

  async getUserByIdNumber(idNumber: string){
    const user = await this.userRepository.findOne({where: {idNumber}, include: {all: true}});
    return user;
  }
}
