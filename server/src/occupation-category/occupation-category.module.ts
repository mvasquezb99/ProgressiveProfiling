import { Module } from '@nestjs/common';
import { OccupationCategoryClass } from './occupation-category.model';
import { OccupationModule } from 'src/occupation/occupation.module';

@Module({
  imports: [OccupationModule],
  providers: [OccupationCategoryClass],
  exports: [OccupationCategoryClass],
})
export class OccupationCategoryModule {}
