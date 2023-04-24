import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { UserRoleService } from '../user-role/user-role.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userRoleService: UserRoleService,
  ) {}

  async getById(dto) {
    const user = await this.userRepository.query(
      `
          SELECT 
            id, credential, "isBanned", "isConfirmed",
            (SELECT COUNT(p.id) FROM posts p WHERE p."ownerId" = '${dto.id}') AS "postsCount"
            FROM users u JOIN credentials с ON с."userId" = '${dto.id}' 
            WHERE u.id = '${dto.id}'
          `,
    );

    if (!user.length) {
      throw new BadRequestException('No user');
    }

    const roles = await this.userRoleService.getUserRoles(dto.id);

    user[0].roles = roles.map((role) => role.role);

    return user[0];
  }

  async getByEmailWithPassword(dto) {
    const user = await this.userRepository.query(
      `SELECT * FROM users JOIN credentials ON "credentials"."userId" = users.id
            WHERE credentials.credential = '${dto.credential}'
            `,
    );

    if (!user.length) {
      throw new BadRequestException('No user');
    }

    return user[0];
  }

  async search() {
    const users = await this.userRepository.query(`select * from users`);
    const usersCount = await this.userRepository.query(
      `SELECT COUNT(*) FROM users;`,
    );

    return { list: users, count: usersCount[0].count };
  }

  async create(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.passwordHash, 12);

    return await this.userRepository.query(
      `insert into users (username, "passwordHash") values('${dto.username}', '${hashPassword}') RETURNING id`,
    );
  }
}
