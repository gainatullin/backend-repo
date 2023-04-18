import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { User } from './user.entity';
import { GetUserDto, CreateUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/get')
  get(@Body() dto: GetUserDto) {
    return this.userService.getById(dto);
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
    console.log('dd', dto);
    return this.userService.search();
  }
}
