import { Module, forwardRef } from '@nestjs/common';
import { OccupationCategoryClass } from './occupation-category.model';

@Module({
    providers: [OccupationCategoryClass],
    exports: [OccupationCategoryClass],
    // imports: [forwardRef(() => OccupationModule)], // Si depende de OccupationModule
    // providers: [forwardRef(() => OccupationCategoryClass)],
    // exports: [forwardRef(() => OccupationCategoryClass)],
})
export class OccupationCategoryModule {}
