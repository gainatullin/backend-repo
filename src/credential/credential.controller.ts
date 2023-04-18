import { Body, Controller, Post } from '@nestjs/common';
import { CredentialService } from './credential.service';

@Controller('credential')
export class CredentialController {
  constructor(private credentialService: CredentialService) {}

  @Post('/create')
  create(@Body() dto) {
    console.log('!');
  }
}
