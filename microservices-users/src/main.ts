import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { RabbitMQ } from './common/constants';


async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.AMQP_URL],
      queue: RabbitMQ.UserQueue,
      queueOptions: {
    durable: true,
  },
    },
  });
  //app.useGlobalFilters(new AllExceptionFilter());
  //app.useGlobalInterceptors(new TimeOutInterceptor());
  //app.useGlobalPipes(new ValidationPipe());
  console.log('Conectando a RabbitMQ en:', process.env.AMQP_URL);
  await app.listen();
  console.log("Microservices users is listening")
}
bootstrap();
