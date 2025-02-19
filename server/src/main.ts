import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Progresive Profiling API')
    .setDescription('API documentation')
    .setVersion('0.0.1')
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger is running on: ${await app.getUrl()}/api/docs`);
}
bootstrap().catch(console.error);
