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
import { ProfilerModule } from './profiler/profiler.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import configuration from './config/configuration';
import { ProfilerService } from './profiler/profiler.service';
import { UserMapper } from './user/mapper/user.mapper';
import { LocationMapper } from './user/mapper/location.mapper';
import { EducationMapper } from './user/mapper/education.mapper';
import { WorkMapper } from './user/mapper/work.mapper';
import { OccupationCategoryMapper } from './occupation-category/mapper/occupation-category.mapper';
import { ProfilerMapper } from './profiler/mapper/profiler.mapper';
import { QueryModule } from './query/query.module';
import { AdminModule } from './admin/admin.module';
import { EmailModule } from './email/email.module';
import { SurveyModule } from './survey/survey.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SurveyController } from './survey/survey.controller';
import { MagnetoModule } from './magneto/magneto.module';
import { PosthogModule } from './posthog/posthog.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    NeogmaModule.forRoot(),
    UserModule,
    OccupationModule,
    OccupationCategoryModule,
    ProfilerModule,
    QueryModule,
    AdminModule,
    EmailModule,
    SurveyModule,
    MagnetoModule,
    PosthogModule,
  ],
  controllers: [
    AppController,
    OccupationController,
    OccupationCategoryController,
    UserController,
    SurveyController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
    OccupationService,
    OccupationCategoryService,
    UserService,
    ProfilerService,
    UserMapper,
    LocationMapper,
    EducationMapper,
    WorkMapper,
    OccupationCategoryMapper,
    ProfilerMapper,
  ],
})
export class AppModule {}
