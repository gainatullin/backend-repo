import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getById(dto) {
    const user = await this.userRepository.query(
      `select id, username, email from users where "users".id = '${dto.id}'`,
    );

    if (!user.length) {
      throw new BadRequestException('No user');
    }

    return user[0];
  }

  async getByEmailWithPassword(dto) {
    const user = await this.userRepository.query(
      `select * from users where "users".email = '${dto.email}'`,
    );

    if (!user.length) {
      throw new BadRequestException('No user');
    }

    return user[0];
  }

  async search() {
    const users = await this.userRepository.query(
      `select id, username, email from users`,
    );
    const usersCount = await this.userRepository.query(
      `SELECT COUNT(*) FROM users;`,
    );

    return { list: users, count: usersCount[0].count };
  }

  async create(dto: CreateUserDto) {
    const { email, passwordHash, username } = dto;
    const user = await this.userRepository.query(
      `select * from users where email = '${email}'`,
    );

    if (user.length) {
      throw new BadRequestException('Already exists');
    }

    const hashPassword = await bcrypt.hash(passwordHash, 12);

    await this.userRepository.query(
      `insert into users ("username", "email", "passwordHash") values('${username}', '${email}', '${hashPassword}')`,
    );
  }
}
