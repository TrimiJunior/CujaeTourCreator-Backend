import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { SceneController } from './scene.controller';

@Module({
  imports: [ProxyModule],
  controllers: [SceneController],
})
export class SceneModule {}
