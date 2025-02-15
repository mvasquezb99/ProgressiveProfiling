import { Module } from '@nestjs/common';
import { OccupationClass } from './occupation.model';

@Module({
  providers: [OccupationClass],
  exports: [OccupationClass],
})
export class OccupationModule { }
