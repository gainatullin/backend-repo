import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CredentialService } from './credential.service';
import { ConfirmCredentialDto } from './dto';

@ApiTags('Credentials')
@Controller('credentials')
export class CredentialController {
  constructor(private credentialService: CredentialService) {}

  @ApiOperation({ summary: 'Credential confirm' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  @Post('/confirm')
  confirm(@Body() dto: ConfirmCredentialDto) {
    return this.credentialService.confirm(dto);
  }
}
