import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getById(dto) {
    // const user = await this.userRepository.query(
    //   `select id, username, email from users where "users".id = '${dto.id}'`,
    // );
    //
    // if (!user.length) {
    //   throw new BadRequestException('No user');
    // }
    //
    // return user[0];
  }

  async getByEmailWithPassword(dto) {
    const user = await this.userRepository.query(
      `SELECT * FROM users JOIN credentials ON "credentials"."userId" = users.id
            WHERE credentials.value = '${dto.credential}'
            `,
    );

    if (!user.length) {
      throw new BadRequestException('No user');
    }

    return user[0];
  }

  async search() {
    const users = await this.userRepository.query(`select * from user`);
    const usersCount = await this.userRepository.query(
      `SELECT COUNT(*) FROM user;`,
    );

    return { list: users, count: usersCount[0].count };
  }

  async create(dto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(dto.passwordHash, 12);

    return await this.userRepository.query(
      `insert into users ("passwordHash") values('${hashPassword}') RETURNING id`,
    );
  }
}
