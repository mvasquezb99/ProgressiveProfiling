import { Controller, Get, Query } from '@nestjs/common';
import { OccupationCategoryService } from './occupation-category.service';
import { ResponseOccupationCategoryDto } from './dto/response-occupation-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('occupation-category')
@Controller('occupation-category')
export class OccupationCategoryController {
  constructor(
    private readonly occupationCategoryService: OccupationCategoryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all occupation categories' })
  @ApiResponse({
    status: 200,
    description: 'Return all occupation categories',
    type: [ResponseOccupationCategoryDto],
  })
  public findAll(): Promise<ResponseOccupationCategoryDto[]> {
    return this.occupationCategoryService.findAll();
  }

  @Get(':name')
  @ApiOperation({ summary: 'Get an occupation category by name' })
  @ApiResponse({
    status: 200,
    description: 'Return an occupation category by name',
    type: ResponseOccupationCategoryDto,
  })
  public findByName(
    @Query('name') name: string,
  ): Promise<ResponseOccupationCategoryDto> {
    return this.occupationCategoryService.findByName(name);
  }
}
