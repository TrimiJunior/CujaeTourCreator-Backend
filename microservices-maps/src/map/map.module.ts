import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MAP } from '../common/models/models';
import { MapController } from './map.controller';
import { MapService } from './map.service';
import { MapSchema } from './schema/map.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: MAP.name, schema: MapSchema }])],
  controllers: [MapController],
  providers: [MapService],
})
export class MapModule {}
