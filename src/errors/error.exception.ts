import { BadRequestException, HttpStatus } from '@nestjs/common';
import { errors } from './errors';

export class CustomErrorException extends BadRequestException {
  public code: string;
  public message: string;
  constructor({ code }) {
    const error = errors.find((error) => error.code === code);
    super({ ...error, statusCode: HttpStatus.BAD_REQUEST });
  }
}
