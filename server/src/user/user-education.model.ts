import { Injectable, Inject } from '@nestjs/common';
import { NeogmaInstance, Neogma, ModelFactory } from 'neogma';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';
import { v4 as uuidv4 } from "uuid";

export type EducationPropertiesI = {
  degree: string;
  institution: string;
  area: string;
  uuid : string;
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
        uuid: { 
          type: "string", 
          required: true, 
          default: () => uuidv4()
        },
      },
      primaryKeyField: "uuid"
    },
    this.neogma,
  );
}
