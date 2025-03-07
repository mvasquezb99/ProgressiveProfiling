import { Controller, Get, Query } from '@nestjs/common';
import { OccupationService } from './occupation.service';
import { ResponseOccupationDto } from './dto/response-occupation.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('occupation')
@Controller('occupation')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) {}

  @Get()
  @ApiOperation({ summary: 'Get all occupations' })
  @ApiResponse({
    status: 200,
    description: 'Return all occupations',
    type: [ResponseOccupationDto],
  })
  public findAll(): Promise<ResponseOccupationDto[]> {
    return this.occupationService.findAll();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get occupation by name' })
  @ApiResponse({
    status: 200,
    description: 'Return occupation by name',
    type: ResponseOccupationDto,
  })
  public findByName(
    @Query('name') name: string,
  ): Promise<ResponseOccupationDto> {
    return this.occupationService.findByName(name);
  }
}
