import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Credential } from '../credential/credential.entity';

@Entity('users')
export class User {
  @ApiProperty({ example: 'string', description: 'Unique identifier' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  passwordHash: string;

  @OneToOne(() => Credential, (credential) => credential.user)
  credential: Credential;
}
