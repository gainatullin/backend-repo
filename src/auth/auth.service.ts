import { BadRequestException, Injectable } from '@nestjs/common';
import { SignInDto } from './dto';
import { UserService } from '../user/user.service';
import { CredentialService } from '../credential/credential.service';
import { CustomErrorException } from '../errors/error.exception';
import { UserRoleService } from '../user-role/user-role.service';
import { EUserRoles } from '../user-role/user-role.entity';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private credentialService: CredentialService,
    private userRoleService: UserRoleService,
    private jwtService: JwtService,
  ) {}

  async signUp(dto) {
    const potentialUser = await this.credentialService.getOneByCredential(
      dto.credential,
    );

    if (potentialUser.length) {
      throw new BadRequestException('Already exists');
    }

    const user = await this.userService.create(dto);
    await this.userRoleService.create({
      userId: user[0].id,
      role: EUserRoles.USER,
    });

    await this.credentialService.create({
      credential: dto.credential,
      userId: user[0].id,
    });
  }

  async signIn(dto: SignInDto) {
    const user = await this.userService.getByEmailWithPassword({
      credential: dto.credential,
    });

    if (!user.isConfirmed) {
      throw new CustomErrorException({
        code: 'USER_CREDENTIAL_IS_NOT_CONFIRMED',
      });
    }

    if (user.isBlocked) {
      throw new CustomErrorException({
        code: 'USER_HAS_BEEN_BLOCKED',
      });
    }

    const isCompare = await bcrypt.compare(dto.passwordHash, user.passwordHash);

    if (!isCompare) {
      throw new BadRequestException({
        code: 'CREDENTIALS_ARE_NOT_CORRECT',
      });
    }

    return { token: this.jwtService.sign({ user: user }) };
  }
}
