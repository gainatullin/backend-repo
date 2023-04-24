import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity('posts')
export class Post {
  @ApiProperty({ example: 'string' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'string' })
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
