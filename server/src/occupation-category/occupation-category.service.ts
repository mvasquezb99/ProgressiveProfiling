import { Injectable } from '@nestjs/common';
import { OccupationCategoryClass } from './occupation-category.model';
import { ResponseOccupationCategoryDto } from './dto/response-occupation-category.dto';

@Injectable()
export class OccupationCategoryService {
  constructor(
    private readonly occupationCategoryClass: OccupationCategoryClass,
  ) { }

  async findAll(): Promise<ResponseOccupationCategoryDto[]> {
    const occupationCategory =
      await this.occupationCategoryClass.categoryModel.findMany();

    return occupationCategory.map((category) => ({
      name: category.name,
    }));
  }

  async findByName(name: string): Promise<ResponseOccupationCategoryDto> {
    const occupationCategory =
      await this.occupationCategoryClass.categoryModel.findOne({
        where: { name: name },
      });
    if (!occupationCategory) {
      throw new Error('Occupation category not found');
    }
    return {
      name: occupationCategory.name,
    };
  }
}
