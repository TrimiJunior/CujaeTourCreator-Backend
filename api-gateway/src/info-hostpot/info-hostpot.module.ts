import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { InfoHostpotController } from './info-hostpot.controller';

@Module({
  imports: [ProxyModule],
  controllers: [InfoHostpotController],
})
export class InfoHostpotModule {}
