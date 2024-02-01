import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { QueryFailFilter } from './query-fail/query-fail.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new QueryFailFilter());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
