import { Inject, Injectable } from '@nestjs/common';
import {
  ModelFactory,
  ModelRelatedNodesI,
  Neogma,
  NeogmaInstance,
} from 'neogma';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';
import { OccupationClass } from 'src/occupation/occupation.model';
import { EducationClass } from './user-education.model';
import { LocationClass } from './user-location.model';
import { WorkClass } from './user-work.model';
import { OccupationCategoryClass } from 'src/occupation-category/occupation-category.model';

export enum Type {
  SAMPLE = 'sample',
  REGULAR = 'regular',
}

export type UserPropertiesI = {
  type: Type.SAMPLE | Type.REGULAR;
  name: string;
  email: string;
  image: string;
  birthdate: string;
  skills: string;
  languages: string;
  promSalary?: string;
  numApplications?: number;
};

export type UserInstance = NeogmaInstance<UserPropertiesI, UserRelatedNodes>;

export interface UserRelatedNodes {
  LikesOccupation: ModelRelatedNodesI<UserClass['userModel'], UserInstance>;
  DislikesOccupation: ModelRelatedNodesI<UserClass['userModel'], UserInstance>;
  LikesCategory: ModelRelatedNodesI<UserClass['userModel'], UserInstance>;
  LikesUser: ModelRelatedNodesI<UserClass['userModel'], UserInstance>;
  HasEducation: ModelRelatedNodesI<UserClass['userModel'], UserInstance>;
  HasLocation: ModelRelatedNodesI<UserClass['userModel'], UserInstance>;
  WorkExperience: ModelRelatedNodesI<UserClass['userModel'], UserInstance>;
}

@Injectable()
export class UserClass {
  constructor(
    @Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma,
    @Inject(OccupationClass) private readonly occupationClass: OccupationClass,
    @Inject(OccupationCategoryClass)
    private readonly occupationCategoryClass: OccupationCategoryClass,
    private readonly workClass: WorkClass,
    private readonly locationClass: LocationClass,
    private readonly educationClass: EducationClass,
  ) {}

  public userModel = ModelFactory<UserPropertiesI, UserRelatedNodes>(
    {
      label: 'User',
      primaryKeyField: 'name',
      schema: {
        type: {
          type: 'string',
          required: true,
        },
        name: {
          type: 'string',
          required: true,
        },
        email: {
          type: 'string',
          required: true,
        },
        image: {
          type: 'string',
          required: false,
        },
        birthdate: {
          type: 'string',
          required: true,
        },
        skills: {
          type: 'string',
          required: false,
        },
        languages: {
          type: 'string',
          required: false,
        },
        promSalary: {
          type: 'string',
          required: false,
        },
        numApplications: {
          type: 'number',
          required: false,
          default: 0,
        },
      },
      relationships: {
        LikesOccupation: {
          model: this.occupationClass.occupationModel,
          direction: 'out',
          name: 'LikesOccupation',
        },
        DislikesOccupation: {
          model: this.occupationClass.occupationModel,
          direction: 'out',
          name: 'DislikesOccupation',
        },
        LikesCategory: {
          model: this.occupationCategoryClass.categoryModel,
          direction: 'out',
          name: 'LikesCategory',
        },
        LikesUser: {
          model: 'self',
          direction: 'out',
          name: 'LikesUser',
        },
        HasEducation: {
          model: this.educationClass.educationModel,
          direction: 'out',
          name: 'HasEducation',
        },
        HasLocation: {
          model: this.locationClass.locationModel,
          direction: 'out',
          name: 'HasLocation',
        },
        WorkExperience: {
          model: this.workClass.workModel,
          direction: 'out',
          name: 'WorkExperience',
        },
      },
    },
    this.neogma,
  );
}
