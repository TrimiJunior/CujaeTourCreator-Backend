import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { MapController } from './map.controller';

@Module({
  imports: [ProxyModule],
  controllers: [MapController],
})
export class MapModule {}
