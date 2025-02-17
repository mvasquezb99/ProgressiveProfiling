import { Injectable, Inject } from '@nestjs/common';
import { NeogmaInstance, Neogma, ModelFactory } from 'neogma';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';

export type WorkPropertiesI = {
  position: string;
  organization: string;
};

export type WorkInstance = NeogmaInstance<WorkPropertiesI, WorkRelatedNodes>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface WorkRelatedNodes {}

@Injectable()
export class WorkClass {
  constructor(@Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma) {}

  public workModel = ModelFactory<WorkPropertiesI, WorkRelatedNodes>(
    {
      label: 'Location',
      schema: {
        position: {
          type: 'string',
          required: true,
        },
        organization: {
          type: 'string',
          required: true,
        },
      },
    },
    this.neogma,
  );
}
