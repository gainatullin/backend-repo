import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'string',
    description: 'User email or phone number',
  })
  @IsString({ message: 'Credential is required field' })
  @IsNotEmpty({ message: 'Credential should not be empty' })
  readonly credential: string;

  @ApiProperty({ example: 'string', description: 'Username' })
  @MinLength(4, { message: 'Username min length 4 symbols' })
  @IsString({ message: 'Username is required field' })
  readonly username: string;

  @ApiProperty({ example: 'string', description: "User's password" })
  @MinLength(4, { message: 'Password hash min length 4 symbols' })
  @IsString({ message: 'Password hash is required field' })
  readonly passwordHash: string;
}
