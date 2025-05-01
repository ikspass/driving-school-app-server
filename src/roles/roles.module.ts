import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [
    SequelizeModule.forFeature([Role, User])
  ],
  exports: [RolesService]
})
export class RolesModule {}
