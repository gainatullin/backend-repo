import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postRepos: Repository<Post>) {}

  async create(dto) {
    await this.postRepos.query(
      `insert into posts (description, "ownerId") values('${dto.description}', '${dto.userId}')`,
    );
  }

  async search(dto) {
    const list = await this.postRepos.query(
      `select * from posts where "ownerId" = '${dto.userId}'`,
    );

    const count = await this.postRepos.query(
      `select COUNT(*) from posts where "ownerId" = '${dto.userId}'`,
    );

    return { list: list, count: count[0].count };
  }
}
