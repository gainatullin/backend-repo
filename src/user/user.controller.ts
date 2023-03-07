import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(200)
  @Post('/create')
  signUp(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
}
