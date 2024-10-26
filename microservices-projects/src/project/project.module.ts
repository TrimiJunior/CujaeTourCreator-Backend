import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PROJECT } from 'src/common/models/models';
import { ProjectSchema } from './schema/project.schema';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
    {
      name: PROJECT.name,
      useFactory:()=> ProjectSchema,
    },
  ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
