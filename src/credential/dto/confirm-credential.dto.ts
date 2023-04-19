import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ConfirmCredentialDto {
  @ApiProperty({ example: 'string', description: 'Credential' })
  @IsString({ message: 'Credential is required field' })
  readonly credential: string;

  @ApiProperty({ example: 'string', description: 'Code confirmation' })
  @IsString({ message: 'Confirmation code is required field' })
  readonly confirmationCode: string;
}
