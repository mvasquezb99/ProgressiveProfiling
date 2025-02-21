import { Module } from '@nestjs/common';
import { OccupationCategoryClass } from './occupation-category.model';
import { OccupationModule } from 'src/occupation/occupation.module';
import { OccupationCategoryService } from './occupation-category.service';
import { OccupationCategoryController } from './occupation-category.controller';

@Module({
  imports: [OccupationModule],
  providers: [OccupationCategoryClass, OccupationCategoryService],
  exports: [OccupationCategoryClass],
  controllers: [OccupationCategoryController],
})
export class OccupationCategoryModule {}
