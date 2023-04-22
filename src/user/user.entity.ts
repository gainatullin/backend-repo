import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
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

  @Column({ unique: true })
  username: string;

  @OneToMany(() => Post, (post) => post.owner)
  posts: Post[];

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  roles: UserRole[];

  @OneToOne(() => Credential, (credential) => credential.user)
  credential: Credential;

  @ApiProperty({ example: Date(), description: 'Created date' })
  @CreateDateColumn()
  createdDate: Date;

  @ApiProperty({ example: Date(), description: 'Updated date' })
  @UpdateDateColumn()
  updatedDate: Date;
}
