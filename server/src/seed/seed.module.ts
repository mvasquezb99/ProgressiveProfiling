import { Module } from '@nestjs/common';
import { SeedDataService } from './seed.service';
import { OccupationCategoryModule } from 'src/occupation-category/occupation-category.module';
import { OccupationModule } from 'src/occupation/occupation.module';
import { NeogmaModule } from 'src/neogma/neogma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    NeogmaModule.forRoot(),
    OccupationModule,
    OccupationCategoryModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UserModule,
  ],
  providers: [SeedDataService],
})
export class SeedModule { }
