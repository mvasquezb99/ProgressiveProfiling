import { Injectable } from '@nestjs/common';
import {
  ResponseOccupationCategoryDto,
  ResponseOccupationCategoryWithCategoriesDto,
} from '../dto/response-occupation-category.dto';
import { CategoryPropertiesI } from '../occupation-category.model';
import { OccupationPropertiesI } from 'src/occupation/occupation.model';
import { ResponseOccupationDto } from 'src/occupation/dto/response-occupation.dto';

@Injectable()
export class OccupationCategoryMapper {
  public toResponse(
    category: CategoryPropertiesI,
  ): ResponseOccupationCategoryDto {
    const categoryDto = new ResponseOccupationCategoryDto();

    categoryDto.name = category.name;

    return categoryDto;
  }

  public toResponseWithOccupations(
    category: CategoryPropertiesI,
    occupations: OccupationPropertiesI[],
  ): ResponseOccupationCategoryWithCategoriesDto {
    const categoryDto = new ResponseOccupationCategoryWithCategoriesDto();

    categoryDto.name = category.name;
    categoryDto.occupations = [];
    occupations.forEach((occupationProp) => {
      const occupation = new ResponseOccupationDto(occupationProp.name);
      categoryDto.occupations.push(occupation);
    });

    return categoryDto;
  }
}
