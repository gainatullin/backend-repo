import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetUserDto {
  @ApiProperty({ example: 'string', description: "User's email" })
  @IsUUID(4, { message: 'Id required field' })
  readonly id: string;
}
