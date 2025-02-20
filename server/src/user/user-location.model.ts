import { Injectable, Inject } from '@nestjs/common';
import { NeogmaInstance, Neogma, ModelFactory } from 'neogma';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';
import { v4 as uuidv4 } from "uuid";


export type LocationPropertiesI = {
  postalCode: string;
  city: string;
  country: string;
  region: string;
  uuid: string;
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
      primaryKeyField: 'uuid',
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
        uuid: { 
          type: "string", 
          required: true, 
          default: () => uuidv4()
        },
      },
    },
    this.neogma,
  );
}
