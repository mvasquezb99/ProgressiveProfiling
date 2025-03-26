import { Module } from '@nestjs/common';
import { OccupationCategoryClass } from './occupation-category.model';
import { OccupationModule } from 'src/occupation/occupation.module';
import { OccupationCategoryService } from './occupation-category.service';
import { OccupationCategoryController } from './occupation-category.controller';
import { OccupationCategoryMapper } from './mapper/occupation-category.mapper';

@Module({
  imports: [OccupationModule],
  providers: [
    OccupationCategoryClass,
    OccupationCategoryService,
    OccupationCategoryMapper,
  ],
  exports: [OccupationCategoryClass, OccupationCategoryMapper],
  controllers: [OccupationCategoryController],
})
export class OccupationCategoryModule { }
