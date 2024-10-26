import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkHostpotModule } from './link-hostpot/link-hostpot.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),MongooseModule.forRoot(process.env.URI_MONGODB, {
     /* useCreateIndex: true,
      useFindAndModify: false,*/
    }),
    LinkHostpotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
