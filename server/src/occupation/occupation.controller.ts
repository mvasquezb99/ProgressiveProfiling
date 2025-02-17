import { Controller, Get, Query } from '@nestjs/common';
import { OccupationService } from './occupation.service';
import { OccupationResponseDto } from './dto/response-occupation.dto';

@Controller('occupation')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) { }

  @Get()
  findAll(): Promise<OccupationResponseDto[]> {
    return this.occupationService.findAll();
  }

  @Get(':name')
  findByName(@Query('name') name: string): Promise<OccupationResponseDto> {
    return this.occupationService.findByName(name);
  }
}
