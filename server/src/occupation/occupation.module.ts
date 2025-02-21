import { Module } from '@nestjs/common';
import { OccupationClass } from './occupation.model';
import { OccupationController } from './occupation.controller';
import { OccupationService } from './occupation.service';

@Module({
  providers: [OccupationClass, OccupationService],
  exports: [OccupationClass],
  controllers: [OccupationController],
})
export class OccupationModule {}
