import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from './credential.entity';
import { Repository } from 'typeorm';
import { CustomErrorException } from '../errors/error.exception';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepo: Repository<Credential>,
  ) {}

  async getOneByCredential(credential) {
    return await this.credentialRepo.query(
      `select * from credentials where credential = '${credential}'`,
    );
  }

  async confirm(dto) {
    const user = await this.getOneByCredential(dto.credential);

    if (!user.length) {
      throw new CustomErrorException({ code: 'USER_NOT_FOUND' });
    }

    if (user[0].isConfirmed) {
      throw new CustomErrorException({
        code: 'USER_CREDENTIAL_ALREADY_CONFIRMED',
      });
    }

    if (user[0].isBlocked) {
      throw new CustomErrorException({
        code: 'USER_HAS_BEEN_BLOCKED',
      });
    }

    if (user[0].confirmationCode !== dto.confirmationCode) {
      throw new CustomErrorException({
        code: 'INCORRECT_CONFIRMATION_CODE',
      });
    }

    await this.credentialRepo.query(`
      update credentials set "isConfirmed" = true where credential = '${dto.credential}'
    `);
  }

  async create(dto) {
    await this.credentialRepo.query(
      `insert into credentials ("credential", "userId") values('${dto.credential}', '${dto.userId}')`,
    );
  }

  async recovery(dto) {
    await this.credentialRepo.query(
      `UPDATE credentials SET "confirmationCode" = '321ABC' WHERE credential = '${dto.credential}';`,
    );
  }
}
