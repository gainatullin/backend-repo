import { DataFactory, Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async seed(): Promise<any> {
    const users = DataFactory.createForClass(User).generate(1000);

    users[0].username = 'admin';
    users[0].email = 'admin@mail.ru';
    users[0].passwordHash = '1234';

    return this.userRepository.insert(users);
  }

  async drop(): Promise<any> {
    return this.userRepository.delete({});
  }
}
