import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { GetUserDto } from './dto';
import { User } from './user.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ type: User })
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
