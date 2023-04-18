import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Credential } from './credential.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class CredentialService {
  constructor(
    @InjectRepository(Credential)
    private credentialRepo: Repository<Credential>,
  ) {}

  async getOneByCredential(credential) {
    return await this.credentialRepo.query(
      `select * from credentials where value = '${credential}'`,
    );
  }

  async create(dto) {
    await this.credentialRepo.query(
      `insert into credentials ("value", "userId") values('${dto.credential}', '${dto.userId}')`,
    );
  }
}
