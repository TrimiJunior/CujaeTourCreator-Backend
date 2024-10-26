import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { INFOHOSTPOT } from 'src/common/models/models';
import { InfoHostpotSchema } from './schema/info-hostpot.schema';
import { InfoHostpotController } from './info-hostpot.controller';
import { InfoHostpotService } from './info-hostpot.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
    {
      name: INFOHOSTPOT.name,
      useFactory:()=> InfoHostpotSchema,
    },
  ]),
  ],
  controllers: [InfoHostpotController],
  providers: [InfoHostpotService]
})
export class LinkHostpotModule {}
