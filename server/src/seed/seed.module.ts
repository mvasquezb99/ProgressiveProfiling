import { Module } from '@nestjs/common';
import { SeedDataService } from './seed.service';
import { OccupationCategoryModule } from 'src/occupation-category/occupation-category.module';
import { OccupationModule } from 'src/occupation/occupation.module';
import { NeogmaModule } from 'src/neogma/neogma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NeogmaModule.forRoot(),
    OccupationModule,
    OccupationCategoryModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
  ],
  providers: [SeedDataService],
})
export class SeedModule {}
