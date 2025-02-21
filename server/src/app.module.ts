import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NeogmaModule } from './neogma/neogma.module';
import { UserModule } from './user/user.module';
import { OccupationModule } from './occupation/occupation.module';
import { OccupationCategoryModule } from './occupation-category/occupation-category.module';
import { OccupationController } from './occupation/occupation.controller';
import { OccupationService } from './occupation/occupation.service';
import { OccupationCategoryService } from './occupation-category/occupation-category.service';
import { OccupationCategoryController } from './occupation-category/occupation-category.controller';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    NeogmaModule.forRoot(),
    UserModule,
    OccupationModule,
    OccupationCategoryModule,
  ],
  controllers: [
    AppController,
    OccupationController,
    OccupationCategoryController,
    UserController,
  ],
  providers: [
    AppService,
    OccupationService,
    OccupationCategoryService,
    UserService,
  ],
})
export class AppModule {}
