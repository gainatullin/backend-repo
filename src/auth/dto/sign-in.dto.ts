import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'string',
    description: 'User email or phone number',
  })
  @IsString({ message: 'Credential is required field' })
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
