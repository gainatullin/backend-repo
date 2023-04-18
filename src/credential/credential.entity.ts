import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('credentials')
export class Credential {
  @PrimaryColumn()
  userId: string;

  @Column()
  value: string;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @OneToOne(() => User, (user) => user.credential)
  @JoinColumn({ name: 'userId' })
  user: User;
}
