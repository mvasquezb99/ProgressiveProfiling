import { Controller, Get, Query } from '@nestjs/common';
import { OccupationCategoryService } from './occupation-category.service';
import { ResponseOccupationCategoryDto } from './dto/response-occupation-category.dto';

@Controller('occupation-category')
export class OccupationCategoryController {
  constructor(
    private readonly occupationCategoryService: OccupationCategoryService,
  ) { }

  @Get()
  findAll(): Promise<ResponseOccupationCategoryDto[]> {
    return this.occupationCategoryService.findAll();
  }

  @Get(':name')
  findByName(
    @Query('name') name: string,
  ): Promise<ResponseOccupationCategoryDto> {
    return this.occupationCategoryService.findByName(name);
  }
}
