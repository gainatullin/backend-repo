import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/get')
  get(@Body() dto) {
    return this.userService.get(dto);
  }

  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(200)
  @Post('/create')
  signUp(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Post('/search')
  search(@Body() dto) {
    return this.userService.search();
  }
}
