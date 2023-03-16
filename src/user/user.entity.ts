import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Channel } from '../channel/channel.entity';

@Entity('users')
export class User {
  // @Factory((faker) => faker.name.fullName())
  @ApiProperty({ example: 0, description: 'Unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  // @Factory((faker, fakectx) => faker.helpers.unique(faker.internet.domainName))
  @ApiProperty({ example: 'string', description: 'Username' })
  @Column({ type: 'varchar', length: 55 })
  username: string;

  // @Factory((faker, ctx) => faker.internet.email(ctx.name))
  @ApiProperty({ example: 'string', description: 'User email' })
  @Column()
  email: string;

  // @Factory((faker, ctx) => faker.internet.password())
  @Column({ select: false })
  passwordHash: string;

  @OneToMany(() => Channel, (channel) => channel.owner)
  channels: Channel[];
}
