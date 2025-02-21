import { NestFactory } from '@nestjs/core';
import { SeedModule } from 'src/seed/seed.module';
import { SeedDataService } from 'src/seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeedModule);

  const seedService = app.get(SeedDataService);
  await seedService.seedData();

  await app.close();
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
