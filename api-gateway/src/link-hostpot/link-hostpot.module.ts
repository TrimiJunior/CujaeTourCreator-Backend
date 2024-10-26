import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { LinkHostpotController } from './link-hostpot.controller';

@Module({
  imports: [ProxyModule],
  controllers: [LinkHostpotController],
})
export class LinkHostpotModule {}
