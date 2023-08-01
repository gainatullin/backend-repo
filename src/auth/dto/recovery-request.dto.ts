import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RecoveryRequestDto {
  @ApiProperty({
    example: 'string',
    description: 'User credential',
  })
  @IsString({ message: 'Credential is required field' })
  readonly credential: string;
}
