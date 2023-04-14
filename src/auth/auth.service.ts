import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async signIn(dto: SignInDto) {
    const user = await this.userService.getByEmailWithPassword({
      email: dto.credential,
    });

    const isCompare = await bcrypt.compare(dto.passwordHash, user.passwordHash);

    if (!isCompare) {
      throw new BadRequestException({
        code: 'CREDENTIALS_ARE_NOT_CORRECT',
      });
    }

    return { token: 'string_token' };
    // return { token: this.jwtService.sign({ user: user }) };
  }
}
