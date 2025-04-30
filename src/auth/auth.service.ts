import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

  constructor(
    private userService: UsersService, 
    private jwtService: JwtService
  ){}

  async login(dto: CreateUserDto & {password: string}){
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto & {password: string}){
    const user = await this.userService.getUserByIdNumber(dto.idNumber);
    if(!user) {
      throw new HttpException('Пользователя с таким идентификационным номером не существует', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    user.setDataValue('password', hashPassword);

    await user.save();
    
    return this.generateToken(user);
  }

  private async generateToken(user: User){
    const payload = {idNumber: user.dataValues.idNumber, id: user.dataValues.id, role: user.dataValues.role}
    return {
      token: this.jwtService.sign(payload)
    }
  }

  private async validateUser(dto: CreateUserDto & {password: string}){
    const user = await this.userService.getUserByIdNumber(dto.idNumber);
    if(user){
      const passwordEquals = await bcrypt.compare(dto.password, user.dataValues.password);
      
      if(passwordEquals){
        return user;
      }
      throw new UnauthorizedException({message: 'Некорректный пароль'})
    }
    throw new UnauthorizedException({message: 'Некорректный идентификационный номер'})
  }
}
