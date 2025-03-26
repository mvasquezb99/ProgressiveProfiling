import { Module } from '@nestjs/common';
import { ProfilerService } from './profiler.service';
import { ProfilerMapper } from './mapper/profiler.mapper';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [ProfilerService, ProfilerMapper],
  exports: [ProfilerService],
})
export class ProfilerModule { }
