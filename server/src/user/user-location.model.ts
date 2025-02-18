import { Injectable, Inject } from '@nestjs/common';
import { NeogmaInstance, Neogma, ModelFactory } from 'neogma';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';

export type LocationPropertiesI = {
  postalCode: string;
  city: string;
  country: string;
  region: string;
};

export type LocationInstance = NeogmaInstance<
  LocationPropertiesI,
  LocationRelatedNodes
>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LocationRelatedNodes {}

@Injectable()
export class LocationClass {
  constructor(@Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma) {}

  public locationModel = ModelFactory<
    LocationPropertiesI,
    LocationRelatedNodes
  >(
    {
      label: 'Location',
      primaryKeyField: 'city',
      schema: {
        postalCode: {
          type: 'string',
          required: false,
        },
        city: {
          type: 'string',
          required: false,
        },
        country: {
          type: 'string',
          required: false,
        },
        region: {
          type: 'string',
          required: false,
        },
      },
    },
    this.neogma,
  );
}
