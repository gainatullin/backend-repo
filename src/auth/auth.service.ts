import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');
import { UserService } from '../user/user.service';
import { CredentialService } from '../credential/credential.service';
import { CustomErrorException } from '../errors/error.exception';
import { UserRoleService } from '../user-role/user-role.service';
import { EUserRoles } from '../user-role/user-role.entity';
import { SignInDto } from './dto';

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

    const isUsedUsername = await this.userService.checkUsername(dto.username);

    if (isUsedUsername.length) {
      throw new BadRequestException('Username already exists');
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

    if (user.isBanned) {
      throw new CustomErrorException({
        code: 'USER_HAS_BEEN_BLOCKED',
      });
    }

    const isCompare = await bcrypt.compareSync(
      dto.passwordHash,
      user.passwordHash,
    );

    if (!isCompare) {
      throw new BadRequestException({
        code: 'CREDENTIALS_ARE_NOT_CORRECT',
      });
    }

    return { token: this.jwtService.sign({ user: user }) };
  }

  async getSelf(userId) {
    return await this.userService.getById(userId);
  }

  async recoveryRequest(dto) {
    const user = await this.credentialService.getOneByCredential(
      dto.credential,
    );

    if (!user) {
      throw new CustomErrorException({
        code: 'USER_NOT_FOUND',
      });
    }

    if (user.isBanned) {
      throw new CustomErrorException({
        code: 'USER_HAS_BEEN_BLOCKED',
      });
    }

    await this.credentialService.recovery(dto);
  }

  async recoveryConfirm(dto) {
    const user = await this.credentialService.getOneByCredential(
      dto.credential,
    );

    if (!user) {
      throw new CustomErrorException({
        code: 'USER_NOT_FOUND',
      });
    }

    if (dto.confirmationCode !== user[0].confirmationCode) {
      throw new CustomErrorException({
        code: 'INCORRECT_CONFIRMATION_CODE',
      });
    }

    const hashPassword = await bcrypt.hash(dto.passwordHash, 12);

    await this.userService.updatePassword(hashPassword, user[0].userId);
  }
}
