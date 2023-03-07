import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'string', description: "User's email" })
  @IsString({ message: 'Email must be valid' })
  readonly username: string;

  @ApiProperty({ example: 'string', description: "User's email" })
  @IsEmail({}, { message: 'Email must be valid' })
  readonly email: string;

  @ApiProperty({ example: 'string', description: "User's password" })
  @MinLength(4, { message: 'Min length 4 symbols' })
  @IsString({ message: 'PasswordHash is required field' })
  readonly passwordHash: string;
}
