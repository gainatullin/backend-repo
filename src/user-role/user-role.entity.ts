import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

export enum EUserRoles {
  ADMIN = 'ADMIN',
  USER = 'USER',
  AUTHOR = 'AUTHOR',
}

@Entity('user-role')
export class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: EUserRoles, default: EUserRoles.USER })
  role: EUserRoles;

  @ManyToOne(() => User, (user) => user.roles, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;
}
