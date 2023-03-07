import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Channel } from './channel.entity';

@Controller('channels')
export class ChannelController {
  constructor(private channelService: ChannelService) {}

  @ApiOperation({ summary: 'Create channel' })
  @ApiResponse({ status: 200, type: Channel })
  @HttpCode(200)
  @Post('/create')
  signUp(@Body() dto) {
    return this.channelService.create(dto);
  }
}
