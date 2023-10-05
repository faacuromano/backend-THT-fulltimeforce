import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import cors from 'cors';

async function bootstrap() {
  const _port = 5566;

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(_port);

  console.log(`\n✅ The run it's OK! Congrats!`);
  console.log(`🏠 Local env --> http://localhost:${_port}`);
}
bootstrap();
