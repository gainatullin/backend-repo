import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchPostsDto {
  @ApiProperty({ example: 'string' })
  @IsUUID('4', { message: 'User id is required field' })
  userId: string;
}
