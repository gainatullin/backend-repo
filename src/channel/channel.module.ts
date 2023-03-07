import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from './channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Channel])],
  controllers: [ChannelController],
  providers: [ChannelService],
})
export class ChannelModule {}
