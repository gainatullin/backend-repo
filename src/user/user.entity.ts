import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Channel } from '../channel/channel.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'string', description: 'Username' })
  @Column({ type: 'varchar', length: 55 })
  username: string;

  @ApiProperty({ example: 'string', description: 'User email' })
  @Column()
  email: string;

  @Column({ select: false })
  passwordHash: string;

  @OneToMany(() => Channel, (channel) => channel.owner)
  channels: Channel[];
}
