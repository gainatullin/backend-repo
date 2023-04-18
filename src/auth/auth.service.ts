import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto';
import { UserService } from '../user/user.service';
import { CredentialService } from '../credential/credential.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private credentialService: CredentialService,
  ) {}

  async signUp(dto) {
    const potentialUser = await this.credentialService.getOneByCredential(
      dto.credential,
    );

    if (potentialUser.length) {
      throw new BadRequestException('Already exists');
    }

    const user = await this.userService.create(dto);
    await this.credentialService.create({ ...dto, userId: user[0].id });
  }

  async signIn(dto: SignInDto) {
    const user = await this.userService.getByEmailWithPassword({
      credential: dto.credential,
    });

    const isCompare = await bcrypt.compare(dto.passwordHash, user.passwordHash);

    if (!isCompare) {
      throw new BadRequestException({
        code: 'CREDENTIALS_ARE_NOT_CORRECT',
      });
    }

    return { token: 'string_token' };
  }

  async test() {
    console.log('1');
    return 1;
  }
}
