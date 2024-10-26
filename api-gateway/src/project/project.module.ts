import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/common/proxy/proxy.module';
import { ProjectController } from './project.controller';

@Module({
  imports: [ProxyModule],
  controllers: [ProjectController],
})
export class ProjectModule {}
