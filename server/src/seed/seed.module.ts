import { Module, OnModuleInit } from '@nestjs/common';
import { SeedDataService } from './seed.service';
import { OccupationCategoryModule } from 'src/occupation-category/occupation-category.module';
import { OccupationModule } from 'src/occupation/occupation.module';

@Module({
  imports: [OccupationModule, OccupationCategoryModule],
  providers: [SeedDataService],
})
export class SeedModule implements OnModuleInit {
  constructor(private readonly seedDataClass: SeedDataService) {}
  async onModuleInit() {
    await this.seedDataClass.seedData();
  }
}
