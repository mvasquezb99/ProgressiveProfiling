import { Inject, Injectable } from '@nestjs/common';
import { ModelFactory, Neogma, NeogmaInstance } from 'neogma';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';
import {} from 'src/user/user.model';

export type OccupationPropertiesI = {
  name: string;
};

export type OcupationInstance = NeogmaInstance<
  OccupationPropertiesI,
  OccupationRelatedNodes
>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface OccupationRelatedNodes {}

@Injectable()
export class OccupationClass {
  constructor(@Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma) {}
  public occupationModel = ModelFactory<
    OccupationPropertiesI,
    OccupationRelatedNodes
  >(
    {
      label: 'Occupation',
      primaryKeyField: 'name',
      schema: {
        name: {
          type: 'string',
          required: true,
        },
      },
    },
    this.neogma,
  );
}
