import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ example: 'string' })
  @IsString({ message: 'Description is required field' })
  description: string;
}
