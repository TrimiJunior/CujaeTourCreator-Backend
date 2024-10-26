import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LINKHOSTPOT } from 'src/common/models/models';
import { LinkHostpotSchema } from './schema/link-hostpot.schema';
import { LinkHostpotController } from './link-hostpot.controller';
import { LinkHostpotService } from './link-hostpot.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
    {
      name: LINKHOSTPOT.name,
      useFactory:()=> LinkHostpotSchema,
    },
  ]),
  ],
  controllers: [LinkHostpotController],
  providers: [LinkHostpotService]
})
export class LinkHostpotModule {}
