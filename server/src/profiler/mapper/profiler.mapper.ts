import { Injectable } from '@nestjs/common';
import { ResponseProfilerDto } from '../dto/response-profiler.dto';
import { UserWeighed } from '../profiler.service';

@Injectable()
export class ProfilerMapper {
  public toResponse(profiler: UserWeighed): ResponseProfilerDto {
    const profilerDto = new ResponseProfilerDto();
    profilerDto.languages = Array.from(profiler.languages.keys());
    profilerDto.education = Array.from(profiler.education.keys());
    profilerDto.work = Array.from(profiler.work.keys());
    profilerDto.categories = Array.from(profiler.categories.keys());
    profilerDto.occupations = Array.from(profiler.occupations.keys());

    return profilerDto;
  }
}
