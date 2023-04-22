import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('credentials')
export class Credential {
  @PrimaryColumn()
  userId: string;

  @Column()
  credential: string;

  @Column({ default: false })
  isConfirmed: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ default: 'ABC123' })
  confirmationCode: string;

  @OneToOne(() => User, (user) => user.credential, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
