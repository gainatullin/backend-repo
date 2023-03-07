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

  async create(dto: CreateUserDto) {
    const { email, passwordHash, username } = dto;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email =:email', { email })
      .andWhere('user.username = :username', { username })
      .getOne();

    if (user) {
      throw new BadRequestException('Already exists');
    }

    const hashPassword = await bcrypt.hash(passwordHash, 12);

    await this.userRepository.save({
      email: email,
      username: username,
      passwordHash: hashPassword,
    });
  }
}
