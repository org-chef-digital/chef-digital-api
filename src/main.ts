import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('PORT');
  await app.listen(port);
}
bootstrap();
