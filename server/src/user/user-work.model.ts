import { Injectable, Inject } from '@nestjs/common';
import { NeogmaInstance, Neogma, ModelFactory } from 'neogma';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';
import { v4 as uuidv4 } from 'uuid';

export type WorkPropertiesI = {
  position: string;
  organization: string;
  uuid: string;
};

export type WorkInstance = NeogmaInstance<WorkPropertiesI, WorkRelatedNodes>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorkRelatedNodes {}

@Injectable()
export class WorkClass {
  constructor(@Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma) {}

  public workModel = ModelFactory<WorkPropertiesI, WorkRelatedNodes>(
    {
      label: 'Work',
      schema: {
        position: {
          type: 'string',
          required: false,
        },
        organization: {
          type: 'string',
          required: false,
        },
        uuid: {
          type: 'string',
          required: true,
          default: () => uuidv4(),
        },
      },
      primaryKeyField: 'uuid',
    },
    this.neogma,
  );
}
