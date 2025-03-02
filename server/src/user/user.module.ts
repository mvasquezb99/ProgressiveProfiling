import { Module } from '@nestjs/common';
import { OccupationModule } from 'src/occupation/occupation.module';
import { UserClass } from './user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EducationClass } from './user-education.model';
import { LocationClass } from './user-location.model';
import { WorkClass } from './user-work.model';
import { OccupationCategoryModule } from 'src/occupation-category/occupation-category.module';
import { ProfilerModule } from 'src/profiler/profiler.module';

@Module({
  imports: [OccupationModule, OccupationCategoryModule, ProfilerModule],
  providers: [UserClass, UserService, EducationClass, LocationClass, WorkClass],
  exports: [UserClass, LocationClass, EducationClass, WorkClass],
  controllers: [UserController],
})
export class UserModule { }
