import { Injectable } from '@nestjs/common';
import { ResponseOccupationCategoryDto } from '../dto/response-occupation-category.dto';
import { CategoryPropertiesI } from '../occupation-category.model';

@Injectable()
export class OccupationCategoryMapper {
  public toResponse(
    category: CategoryPropertiesI,
  ): ResponseOccupationCategoryDto {
    const categoryDto = new ResponseOccupationCategoryDto();

    categoryDto.name = category.name;

    return categoryDto;
  }
}
