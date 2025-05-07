import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 200, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() dto: CreateUserDto){
    return this.userService.createUser(dto);
  }

  @ApiOperation({summary: 'Получение всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  // @UseGuards(JwtAuthGuard)
  // @Roles("teacher")
  // @UseGuards(RolesGuard)
  @Get()
  getAll(){
    return this.userService.getAllUsers();
  }

  @ApiOperation({summary: 'Получить пользователя по idNumber'})
  @ApiResponse({status: 200, type: User})
  @Get()
  getByValue(@Body() idNumber: string) {
    return this.userService.getUserByIdNumber(idNumber);
  }
}
