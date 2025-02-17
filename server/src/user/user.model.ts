import { Inject, Injectable } from '@nestjs/common';
import {
  ModelFactory,
  ModelRelatedNodesI,
  Neogma,
  NeogmaInstance,
} from 'neogma';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';
import { OccupationClass } from 'src/occupation/occupation.model';

export type UserPropertiesI = {
  name: string;
};

export type UserInstance = NeogmaInstance<UserPropertiesI, UserRelatedNodes>;

export interface UserRelatedNodes {
  Has: ModelRelatedNodesI<UserClass['userModel'], UserInstance>;
}

@Injectable()
export class UserClass {
  constructor(
    @Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma,
    @Inject(OccupationClass) private readonly occupationClass: OccupationClass,
  ) {}

  public userModel = ModelFactory<UserPropertiesI, UserRelatedNodes>(
    {
      label: 'User',
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
