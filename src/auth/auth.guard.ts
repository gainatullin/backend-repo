import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CustomErrorException } from '../errors/error.exception';

export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    console.log('start');
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new CustomErrorException({ code: 'USER_IS_NOT_AUTHORIZED' });
      }

      const tokenVerify = this.jwtService.verify(token);
      console.log('tokenVerify', tokenVerify);

      return true;
    } catch (error) {
      console.log('a');
    }
  }
}
