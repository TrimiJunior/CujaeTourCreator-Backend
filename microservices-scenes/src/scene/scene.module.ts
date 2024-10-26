import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SCENE } from 'src/common/models/models';
import { SceneSchema } from './schema/scene.schema';
import { SceneController } from './scene.controller';
import { SceneService } from './scene.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
    {
      name: SCENE.name,
      useFactory:()=> SceneSchema,
    },
  ]),
  ],
  controllers: [SceneController],
  providers: [SceneService]
})
export class SceneModule {}
