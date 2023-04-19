import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { GetUserDto } from './dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/get')
  @HttpCode(200)
  get(@Body() dto: GetUserDto) {
    return this.userService.getById(dto);
  }

  @Post('/search')
  @HttpCode(200)
  search(@Body() dto) {
    return this.userService.search();
  }
}
