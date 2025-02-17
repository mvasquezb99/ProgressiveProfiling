import { Controller, Get } from '@nestjs/common';
import { OccupationCategoryService } from './occupation-category.service';
import { ResponseOccupationCategoryDto } from './dto/response-occupation-category.dto';

@Controller('occupation-category')
export class OccupationCategoryController {
  constructor(
    private readonly occupationCategoryService: OccupationCategoryService,
  ) {}

  @Get()
  findAll(): Promise<ResponseOccupationCategoryDto[]> {
    return this.occupationCategoryService.findAll();
  }
}
