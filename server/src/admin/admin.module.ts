import { Module } from '@nestjs/common';
import { NeogmaModule } from 'src/neogma/neogma.module';
import { OccupationCategoryModule } from 'src/occupation-category/occupation-category.module';
import { OccupationModule } from 'src/occupation/occupation.module';
import { ProfilerModule } from 'src/profiler/profiler.module';
import { QueryModule } from 'src/query/query.module';
import { AdminUserController } from './admin-user.constroller';
import { UserModule } from 'src/user/user.module';
import { AdminUserService } from './admin-user.service';

@Module({
  imports: [
    UserModule,
    OccupationModule,
    OccupationCategoryModule,
    ProfilerModule,
    QueryModule,
    NeogmaModule,
  ],
  providers: [AdminUserService],
  controllers: [AdminUserController],
})
export class AdminModule { }
