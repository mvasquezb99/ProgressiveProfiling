import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NeogmaModule } from './neogma/neogma.module';
import { UserModule } from './user/user.module';
import { OccupationModule } from './occupation/occupation.module';
import { OccupationCategoryModule } from './occupation-category/occupation-category.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    NeogmaModule.forRoot(),
    UserModule,
    OccupationModule,
    OccupationCategoryModule,
    SeedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
