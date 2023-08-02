import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomErrorException } from '../errors/error.exception';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new CustomErrorException({ code: 'USER_IS_NOT_AUTHORIZED' });
      }

      const tokenVerify = this.jwtService.verify(token);
      req.user = await this.userService.getById({ id: tokenVerify.user.id });

      return true;
    } catch (error) {
      console.log('Auth guard error >>>', error);
    }
  }
}
