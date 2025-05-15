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

  async adminLogin(body: {password: string}){
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (body.password === adminPassword) {
      const payload = { role: { id: 0, value: 'admin', description: 'Администратор'} }; 
      return {
        token: this.jwtService.sign(payload)
      }
    } else {
      throw new Error('Неверный пароль');
    }
  }

  async login(dto: CreateUserDto & {password: string}){
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto & {password: string}){
    const candidate = await this.userService.getUserByIdNumber(dto.idNumber);
    if(candidate){
      if(candidate.getDataValue('password') == null){
        const hashPassword = await bcrypt.hash(dto.password, 5);
        candidate.setDataValue('password', hashPassword);
        await candidate.save();
        return this.generateToken(candidate);
      }
      throw new HttpException('Пользователь с таким идентификационным номером уже зарегистрирован', HttpStatus.BAD_REQUEST);
    }
    throw new HttpException('Пользователя с таким идентификационным номером не существует', HttpStatus.BAD_REQUEST);
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
