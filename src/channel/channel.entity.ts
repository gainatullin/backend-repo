import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('channels')
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 55 })
  name: string;

  @ManyToOne(() => User, (user) => user.channels, {
    onDelete: 'CASCADE',
    cascade: true,
  })
  owner: User;

  @Column({ default: 0 })
  subscribersCount: number;
}
