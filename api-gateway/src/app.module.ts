import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule} from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { SceneModule } from './scene/scene.module';
import { LinkHostpotModule } from './link-hostpot/link-hostpot.module';
import { InfoHostpotModule } from './info-hostpot/info-hostpot.module';
import {BruteMiddleware} from './middlewares/limiter/brute-middle';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development'],
      isGlobal: true,
    }),
    UserModule,
    AuthModule,
    ProjectModule,
    SceneModule,
    LinkHostpotModule,
    InfoHostpotModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BruteMiddleware).forRoutes('api/v1/auth/signin');
    // consumer.apply(BruteMiddleware).forRoutes({path: '*', method: RequestMethod.ALL});
   
  }

}