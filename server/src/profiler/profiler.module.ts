import { Module } from '@nestjs/common';
import { ProfilerService } from './profiler.service';
import { ProfilerMapper } from './mapper/profiler.mapper';

@Module({
  imports: [],
  providers: [ProfilerService, ProfilerMapper],
  exports: [ProfilerService],
})
export class ProfilerModule {}
