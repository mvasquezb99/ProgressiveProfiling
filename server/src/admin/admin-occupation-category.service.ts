import { Inject, Injectable } from '@nestjs/common';
import {
  RequestOccupationCategoryArrayDto,
  RequestOccupationCategoryDto,
} from 'src/occupation-category/dto/request-occupation-category.dto';
import {
  ResponseOccupationCategoryDto,
  ResponseOccupationCategoryWithCategoriesDto,
} from 'src/occupation-category/dto/response-occupation-category.dto';
import { OccupationCategoryMapper } from 'src/occupation-category/mapper/occupation-category.mapper';
import { OccupationCategoryClass } from 'src/occupation-category/occupation-category.model';
import { RelateCategoryWithOccupationDto } from './dto/request-update-relationships.dto';
import {
  OccupationClass,
  OccupationPropertiesI,
} from 'src/occupation/occupation.model';
import { QueryNode, QueryService } from 'src/query/query.service';

@Injectable()
export class AdminOccupationCategoryService {
  public constructor(
    @Inject(OccupationCategoryClass)
    private readonly occupationCategoryClass: OccupationCategoryClass,
    @Inject(OccupationCategoryMapper)
    private readonly occupationCategoryMapper: OccupationCategoryMapper,
    @Inject(OccupationClass) private readonly occupationClass: OccupationClass,
    @Inject(QueryService) private readonly queryService: QueryService,
  ) {}

  public async getAllCategories(): Promise<ResponseOccupationCategoryDto[]> {
    const categories =
      await this.occupationCategoryClass.categoryModel.findMany();
    const categoriesArr = new Array<ResponseOccupationCategoryDto>();
    categories.forEach((category) => {
      categoriesArr.push(this.occupationCategoryMapper.toResponse(category));
    });
    return categoriesArr;
  }

  public async getCategoryByName(
    name: string,
  ): Promise<ResponseOccupationCategoryDto> {
    const category = await this.occupationCategoryClass.categoryModel.findOne({
      where: {
        name: name,
      },
    });
    console.log(category);
    if (!category) {
      throw new Error('Category not found');
    }
    return this.occupationCategoryMapper.toResponse(category);
  }

  public async saveCategories(
    body: RequestOccupationCategoryArrayDto,
  ): Promise<ResponseOccupationCategoryDto[]> {
    const categoriesArr = new Array<ResponseOccupationCategoryDto>();
    await Promise.all(
      body.categories.map(async (category) => {
        const savedCategory =
          await this.occupationCategoryClass.categoryModel.createOne(category);
        categoriesArr.push(
          this.occupationCategoryMapper.toResponse(savedCategory),
        );
      }),
    );
    return categoriesArr;
  }

  public async saveCategory(
    body: RequestOccupationCategoryDto,
  ): Promise<ResponseOccupationCategoryDto> {
    const newCategory =
      await this.occupationCategoryClass.categoryModel.createOne(body);
    return this.occupationCategoryMapper.toResponse(newCategory);
  }

  public async relateCategoryToOccupation(
    body: RelateCategoryWithOccupationDto,
  ): Promise<ResponseOccupationCategoryWithCategoriesDto> {
    let category = await this.occupationCategoryClass.categoryModel.findOne({
      where: { name: body.category.name },
    });
    if (!category) {
      category = await this.occupationCategoryClass.categoryModel.createOne(
        body.category,
      );
    }
    let occupation = await this.occupationClass.occupationModel.findOne({
      where: {
        name: body.occupation.name,
      },
    });
    if (!occupation) {
      occupation = await this.occupationClass.occupationModel.createOne(
        body.occupation,
      );
    }

    const occupationsProp = new Array<OccupationPropertiesI>();

    const relationsNodes = await this.queryService.getOccupationsFromCategory(
      category.name,
    );

    const occupationsQueryNodes = relationsNodes.records.map(
      (r) => r.get('o') as QueryNode,
    );

    occupationsQueryNodes.forEach((node) => {
      const props = node.properties as OccupationPropertiesI;
      occupationsProp.push(props);
    });

    for (const occProp of occupationsProp) {
      if (occProp.name === body.occupation.name) {
        console.log('YA ESTAAAAAA');
        return this.occupationCategoryMapper.toResponseWithOccupations(
          category,
          occupationsProp,
        );
      }
    }

    await category.relateTo({
      alias: 'Has',
      where: {
        name: body.occupation.name,
      },
    });

    occupationsProp.push({ name: body.occupation.name });

    return this.occupationCategoryMapper.toResponseWithOccupations(
      category,
      occupationsProp,
    );
  }
}
