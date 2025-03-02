import { ResponseOccupationCategoryDto } from '../dto/response-occupation-category.dto';
import { CategoryPropertiesI } from '../occupation-category.model';

export class OccupationCategoryMapper {
  static apply(category: CategoryPropertiesI): ResponseOccupationCategoryDto {
    const categoryDto = new ResponseOccupationCategoryDto();

    categoryDto.name = category.name;

    return categoryDto;
  }
}
