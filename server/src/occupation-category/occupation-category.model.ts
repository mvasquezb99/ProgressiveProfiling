import { Inject, Injectable } from '@nestjs/common';
import {
  ModelFactory,
  ModelRelatedNodesI,
  Neogma,
  NeogmaInstance,
} from 'neogma';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';
import { OccupationClass } from 'src/occupation/occupation.model';
import { UserClass } from 'src/user/user.model';

export type CategoryPropertiesI = {
  name: string;
};

export type CategoryInstance = NeogmaInstance<
  CategoryPropertiesI,
  CategoryRelatedNodes
>;

export interface CategoryRelatedNodes {
  Has: ModelRelatedNodesI<
    OccupationCategoryClass['categoryModel'],
    CategoryInstance
  >;
}

@Injectable()
export class OccupationCategoryClass {
  constructor(
    @Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma,
    @Inject(OccupationClass) private readonly occupationClass: OccupationClass,
  ) {}

  public categoryModel = ModelFactory<
    CategoryPropertiesI,
    CategoryRelatedNodes
  >(
    {
      label: 'Category',
      primaryKeyField: 'name',
      schema: {
        name: {
          type: 'string',
          required: true,
        },
      },
      relationships: {
        Has: {
          model: this.occupationClass.occupationModel,
          direction: 'out',
          name: 'Has',
        },
      },
    },
    this.neogma,
  );
}
