import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dtos/return-user.dto';
import { FindUsersQueryDto } from './dtos/find-users-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/role.decorator';
import { UserRole } from './user-roles.enum';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard(), RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('createAdmin')
  @Role(UserRole.ADMIN)
  async createAdminUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<ReturnUserDto> {
    const user = await this.usersService.createAdminUser(createUserDto);

    return { user, message: 'Administrator successfully registered' };
  }

  @Get('findByQuery')
  @Role(UserRole.ADMIN)
  async findUsersByQuery(@Query() query: FindUsersQueryDto) {
    const found = await this.usersService.findUsersByQuery(query);

    return {
      found,
      message: 'Users found',
    };
  }

  @Get('findAll')
  @Role(UserRole.ADMIN)
  async findAll() {
    return this.usersService.findAll();
  }
}
