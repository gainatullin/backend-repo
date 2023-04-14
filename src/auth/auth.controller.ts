import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signIn')
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}
