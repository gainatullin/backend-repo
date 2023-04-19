import { Body, Controller, Post } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { ApiTags } from '@nestjs/swagger';
import { ConfirmCredentialDto } from './dto';

@ApiTags('Credentials')
@Controller('credentials')
export class CredentialController {
  constructor(private credentialService: CredentialService) {}

  @Post('/confirm')
  confirm(@Body() dto: ConfirmCredentialDto) {
    return this.credentialService.confirm(dto);
  }
}
