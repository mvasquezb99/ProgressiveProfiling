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
import { UserMapper } from './mapper/user.mapper';
import { LocationMapper } from './mapper/location.mapper';
import { EducationMapper } from './mapper/education.mapper';
import { WorkMapper } from './mapper/work.mapper';
import { ResponseUserDto } from './dto/response-user.dto';
import { QueryModule } from 'src/query/query.module';
import { NeogmaModule } from 'src/neogma/neogma.module';

@Module({
  imports: [
    OccupationModule,
    OccupationCategoryModule,
    ProfilerModule,
    QueryModule,
    NeogmaModule,
  ],
  providers: [
    UserClass,
    UserService,
    EducationClass,
    LocationClass,
    WorkClass,
    UserMapper,
    LocationMapper,
    EducationMapper,
    WorkMapper,
    ResponseUserDto,
  ],
  exports: [
    UserService,
    UserClass,
    LocationClass,
    EducationClass,
    WorkClass,
    UserMapper,
    EducationMapper,
    LocationMapper,
    WorkMapper,
  ],
  controllers: [UserController],
})
export class UserModule {}
