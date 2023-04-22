import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './user-role.entity';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private roleRepository: Repository<UserRole>,
  ) {}

  async create(dto) {
    return await this.roleRepository.query(
      `insert into "user-role" (role, "userId") values('${dto.role}', '${dto.userId}')`,
    );
  }

  async getUserRoles(userId) {
    return await this.roleRepository.query(`
      select * from "user-role" where "userId" = '${userId}';
    `);
  }
}
