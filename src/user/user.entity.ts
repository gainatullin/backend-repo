import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Credential } from '../credential/credential.entity';
import { UserRole } from '../user-role/user-role.entity';
import { Post } from '../post/post.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: 'string', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  passwordHash: string;

  @ApiProperty({ example: 'string', description: 'Username' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 0, name: 'postsCount', description: 'Posts count' })
  @OneToMany(() => Post, (post) => post.owner)
  posts: Post[];

  @ApiProperty({ example: ['string'], description: 'Roles' })
  @OneToMany(() => UserRole, (userRole) => userRole.user)
  roles: UserRole[];

  @OneToMany(() => Credential, (credential) => credential.user)
  credential: Credential;

  @ApiProperty({ example: Date(), description: 'Created date' })
  @CreateDateColumn()
  createdDate: Date;

  @ApiProperty({ example: Date(), description: 'Updated date' })
  @UpdateDateColumn()
  updatedDate: Date;
}
