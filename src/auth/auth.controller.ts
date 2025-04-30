import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: CreateUserDto & {password: string}){
    return this.authService.login(dto);
  }

  @Post('/registration')
  registration(@Body() dto: CreateUserDto & {password: string}){
    return this.authService.registration(dto);
  }
}
