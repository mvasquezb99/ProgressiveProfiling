import { Injectable, Inject } from '@nestjs/common';
import { NeogmaInstance, Neogma, ModelFactory } from 'neogma';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';

export type EducationPropertiesI = {
  degree: string;
  institution: string;
  area: string;
};

export type EducationInstance = NeogmaInstance<
  EducationPropertiesI,
  EducationRelatedNodes
>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface EducationRelatedNodes {}

@Injectable()
export class EducationClass {
  constructor(@Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma) {}

  public educationModel = ModelFactory<
    EducationPropertiesI,
    EducationRelatedNodes
  >(
    {
      label: 'Education',
      schema: {
        degree: {
          type: 'string',
          required: true,
        },
        institution: {
          type: 'string',
          required: false,
        },
        area: {
          type: 'string',
          required: false,
        },
      },
    },
    this.neogma,
  );
}
