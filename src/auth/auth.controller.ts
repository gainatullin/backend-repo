import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RecoveryRequestDto, SignInDto, SignUpDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { User } from '../user/user.entity';
import { ValidationPipe } from '../pipes/validation.pipe';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 200 })
  @Post('/signUp')
  @HttpCode(200)
  signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @UsePipes(new ValidationPipe())
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

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Recovery request' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @Post('/recovery/request')
  recoveryRequest(@Body() dto: RecoveryRequestDto) {
    return this.authService.recoveryRequest(dto);
  }

  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Recovery confirm' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @Post('/recovery/confirm')
  recoveryConfirm(@Body() dto) {
    return this.authService.recoveryConfirm(dto);
  }
}
