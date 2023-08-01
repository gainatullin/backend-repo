import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { User } from '../user/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 200 })
  @Post('/signUp')
  @HttpCode(200)
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 200 })
  @Post('/signIn')
  @HttpCode(200)
  signIn(@Body() dto: SignInDto) {
    return this.authService.signIn(dto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get self' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(200)
  @Post('/getSelf')
  getSelf(@Req() req) {
    return this.authService.getSelf(req.user);
  }

  @Post('/recovery/request')
  recoveryRequest(@Body() dto) {
    console.log('1', dto);
  }

  @Post('/recovery/confirm')
  recoveryConfirm(@Body() dto) {
    console.log('1', dto);
  }
}
