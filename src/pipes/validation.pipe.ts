import {
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata): Promise<string> {
    const obj = plainToInstance(metadata.metatype, value);
    const errors = await validate(obj);
    if (errors.length) {
      const messages = errors.map((err: any) => {
        return `${Object.values(
          err.constraints || err.children[0].constraints,
        ).join(', ')}`;
      });

      messages.map((message: string) => {
        throw new BadRequestException({
          message: message,
          code: 'ENTER_CORRECT_VALUE',
          status: HttpStatus.BAD_REQUEST,
        });
      });
    }
    return value;
  }
}
