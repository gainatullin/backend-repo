import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  owner: User;

  @ApiProperty({ example: Date(), description: 'Created date' })
  @CreateDateColumn()
  createdDate: Date;

  @ApiProperty({ example: Date(), description: 'Updated date' })
  @UpdateDateColumn()
  updatedDate: Date;
}
