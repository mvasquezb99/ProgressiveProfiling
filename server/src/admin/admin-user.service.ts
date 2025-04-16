import { Inject, Injectable } from '@nestjs/common';
import {
  RequestFinalUserArrayDto,
  RequestFinalUserDto,
  RequestFinalUserUpdateDto,
} from 'src/user/dto/request-final-user.dto';
import { EducationMapper } from 'src/user/mapper/education.mapper';
import { LocationMapper } from 'src/user/mapper/location.mapper';
import { UserMapper } from 'src/user/mapper/user.mapper';
import { WorkMapper } from 'src/user/mapper/work.mapper';
import { EducationClass } from 'src/user/user-education.model';
import { LocationClass } from 'src/user/user-location.model';
import { WorkClass } from 'src/user/user-work.model';
import { UserClass } from 'src/user/user.model';
import { UpdateRelationshipsDto } from './dto/request-update-relationships.dto';
import { v4 as uuidv4 } from 'uuid';
import { OccupationClass } from 'src/occupation/occupation.model';
import { OccupationCategoryClass } from 'src/occupation-category/occupation-category.model';
import { QueryNode, QueryService } from 'src/query/query.service';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';

@Injectable()
export class AdminUserService {
  constructor(
    @Inject(UserClass) private readonly userClass: UserClass,
    @Inject(UserMapper) private readonly userMapper: UserMapper,
    @Inject(EducationMapper) private readonly educationMapper: EducationMapper,
    @Inject(LocationMapper) private readonly locationMapper: LocationMapper,
    @Inject(WorkMapper) private readonly workMapper: WorkMapper,
    @Inject(LocationClass) private readonly locationClass: LocationClass,
    @Inject(WorkClass) private readonly workClass: WorkClass,
    @Inject(EducationClass) private readonly educationClass: EducationClass,
    @Inject(OccupationClass) private readonly occupationClass: OccupationClass,
    @Inject(OccupationCategoryClass)
    private readonly occupationCategoryClass: OccupationCategoryClass,
    @Inject(QueryService) private readonly queryService: QueryService,
  ) {}

  public async getUserByName(name: string): Promise<ResponseUserDto> {
    const dtoData: Record<string, QueryNode[]> = {};
    const user = await this.userClass.userModel.findOne({
      where: {
        name: name,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const relationsNodes = await this.queryService.queryRelationships(
      user.name,
    );
    dtoData[user.name] = relationsNodes.records.map(
      (r) => r.get('n') as QueryNode,
    );

    return this.userMapper.apply(user, dtoData[user.name]);
  }

  public async saveUsers(body: RequestFinalUserArrayDto): Promise<void> {
    await Promise.all(
      body.users.map(async (user) => {
        const userProp = this.userMapper.toProperties(user);

        let educationNode = await this.educationClass.educationModel.findOne({
          where: {
            degree: user.education.degree,
            institution: user.education.institution,
            area: user.education.area,
          },
        });
        if (!educationNode) {
          const educationProp = this.educationMapper.toProperties(
            user.education,
          );
          educationNode =
            await this.educationClass.educationModel.createOne(educationProp);
        }

        let workNode = await this.workClass.workModel.findOne({
          where: {
            organization: user.work.organization,
            position: user.work.position,
          },
        });
        if (!workNode) {
          const workProp = this.workMapper.toProperties(user.work);
          workNode = await this.workClass.workModel.createOne(workProp);
        }

        let locationNode = await this.locationClass.locationModel.findOne({
          where: {
            postalCode: user.location.postalCode,
            city: user.location.city,
            country: user.location.country,
            region: user.location.region,
          },
        });
        if (!locationNode) {
          const locationProp = this.locationMapper.toProperties(user.location);
          locationNode =
            await this.locationClass.locationModel.createOne(locationProp);
        }

        const userNode = await this.userClass.userModel.createOne(userProp);
        await userNode.relateTo({
          alias: 'HasEducation',
          where: {
            uuid: educationNode.uuid,
          },
        });
        await userNode.relateTo({
          alias: 'WorkExperience',
          where: {
            uuid: workNode.uuid,
          },
        });
        await userNode.relateTo({
          alias: 'HasLocation',
          where: {
            uuid: locationNode.uuid,
          },
        });
        await userNode.relateTo({
          alias: 'LikesCategory',
          where: {
            name: user.category.name,
          },
        });
        await Promise.all(
          user.occupations.map((occupation) =>
            userNode.relateTo({
              alias: 'LikesOccupation',
              where: {
                name: occupation.name,
              },
            }),
          ),
        );
      }),
    );
  }

  public async saveUser(user: RequestFinalUserDto): Promise<ResponseUserDto> {
    const userProp = this.userMapper.toProperties(user);

    let educationNode = await this.educationClass.educationModel.findOne({
      where: {
        degree: user.education.degree,
        institution: user.education.institution,
        area: user.education.area,
      },
    });
    if (!educationNode) {
      const educationProp = this.educationMapper.toProperties(user.education);
      educationNode =
        await this.educationClass.educationModel.createOne(educationProp);
    }

    let workNode = await this.workClass.workModel.findOne({
      where: {
        organization: user.work.organization,
        position: user.work.position,
      },
    });
    if (!workNode) {
      const workProp = this.workMapper.toProperties(user.work);
      workNode = await this.workClass.workModel.createOne(workProp);
    }

    let locationNode = await this.locationClass.locationModel.findOne({
      where: {
        postalCode: user.location.postalCode,
        city: user.location.city,
        country: user.location.country,
        region: user.location.region,
      },
    });
    if (!locationNode) {
      const locationProp = this.locationMapper.toProperties(user.location);
      locationNode =
        await this.locationClass.locationModel.createOne(locationProp);
    }

    const userNode = await this.userClass.userModel.createOne(userProp);
    await userNode.relateTo({
      alias: 'HasEducation',
      where: {
        uuid: educationNode.uuid,
      },
    });
    await userNode.relateTo({
      alias: 'WorkExperience',
      where: {
        uuid: workNode.uuid,
      },
    });
    await userNode.relateTo({
      alias: 'HasLocation',
      where: {
        uuid: locationNode.uuid,
      },
    });
    await userNode.relateTo({
      alias: 'LikesCategory',
      where: {
        name: user.category.name,
      },
    });
    await Promise.all(
      user.occupations.map((occupation) =>
        userNode.relateTo({
          alias: 'LikesOccupation',
          where: {
            name: occupation.name,
          },
        }),
      ),
    );
    const dtoData: Record<string, QueryNode[]> = {};
    const updatedUser = await this.userClass.userModel.findOne({
      where: {
        name: user.name,
      },
    });
    if (!updatedUser) {
      throw new Error('New user not found');
    }
    const relationsNodes = await this.queryService.queryRelationships(
      updatedUser.name,
    );
    dtoData[user.name] = relationsNodes.records.map(
      (r) => r.get('n') as QueryNode,
    );
    return this.userMapper.apply(updatedUser, dtoData[updatedUser.name]);
  }

  public async relateUser(
    name: string,
    body: UpdateRelationshipsDto,
  ): Promise<ResponseUserDto> {
    const user = await this.userClass.userModel.findOne({
      where: {
        name: name,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }

    const bodyEducation = body.education;
    const bodyWork = body.work;
    const bodyLocation = body.location;
    const bodyCategory = body.category;
    const bodyOccupations = body.occupations;

    if (bodyEducation) {
      await this.queryService.deleteUserRelationshipEducation(user.name);
      let educationNode = await this.educationClass.educationModel.findOne({
        where: {
          degree: bodyEducation.degree,
          institution: bodyEducation.institution,
          area: bodyEducation.area,
        },
      });
      if (!educationNode) {
        educationNode = await this.educationClass.educationModel.createOne({
          uuid: uuidv4(),
          degree: bodyEducation.degree,
          institution: bodyEducation.institution,
          area: bodyEducation.area,
        });
      }
      await user.relateTo({
        alias: 'HasEducation',
        where: {
          uuid: educationNode.uuid,
        },
      });
    }
    if (bodyWork) {
      await this.queryService.deleteUserRelationshipWork(user.name);
      let workNode = await this.workClass.workModel.findOne({
        where: {
          organization: bodyWork.organization,
          position: bodyWork.position,
        },
      });
      if (!workNode) {
        workNode = await this.workClass.workModel.createOne({
          uuid: uuidv4(),
          organization: bodyWork.organization,
          position: bodyWork.position,
        });
      }
      await user.relateTo({
        alias: 'WorkExperience',
        where: {
          uuid: workNode.uuid,
        },
      });
    }
    if (bodyLocation) {
      await this.queryService.deleteUserRelationshipLocation(user.name);
      let locationNode = await this.locationClass.locationModel.findOne({
        where: {
          postalCode: bodyLocation.postalCode,
          city: bodyLocation.city,
          country: bodyLocation.country,
          region: bodyLocation.region,
        },
      });
      if (!locationNode) {
        locationNode = await this.locationClass.locationModel.createOne({
          uuid: uuidv4(),
          postalCode: bodyLocation.postalCode,
          city: bodyLocation.city,
          country: bodyLocation.country,
          region: bodyLocation.region,
        });
      }
      await user.relateTo({
        alias: 'HasLocation',
        where: {
          uuid: locationNode.uuid,
        },
      });
    }
    if (bodyCategory) {
      await this.queryService.deleteUserRelationshipCategory(user.name);
      const categoryNode =
        await this.occupationCategoryClass.categoryModel.findOne({
          where: {
            name: bodyCategory.name,
          },
        });
      if (!categoryNode) {
        throw new Error('Category not found');
      }
      await user.relateTo({
        alias: 'LikesCategory',
        where: {
          name: categoryNode.name,
        },
      });
    }
    if (bodyOccupations) {
      await this.queryService.deleteUserRelationshipOccupations(user.name);
      await Promise.all(
        bodyOccupations.map(async (occupation) => {
          const occupationNode =
            await this.occupationClass.occupationModel.findOne({
              where: {
                name: occupation.name,
              },
            });
          if (!occupationNode) {
            throw new Error('Occupation not found');
          }
          return user.relateTo({
            alias: 'LikesOccupation',
            where: {
              name: occupationNode.name,
            },
          });
        }),
      );
    }
    const dtoData: Record<string, QueryNode[]> = {};
    const updatedUser = await this.userClass.userModel.findOne({
      where: {
        name: name,
      },
    });
    if (!updatedUser) {
      throw new Error('Updated user not found');
    }
    const relationsNodes = await this.queryService.queryRelationships(
      updatedUser.name,
    );
    dtoData[user.name] = relationsNodes.records.map(
      (r) => r.get('n') as QueryNode,
    );
    return this.userMapper.apply(updatedUser, dtoData[updatedUser.name]);
  }

  public async deleteUserByName(name: string): Promise<ResponseUserDto> {
    const user = await this.userClass.userModel.findOne({
      where: {
        name: name,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    await user.delete();
    return this.userMapper.toResponse(user);
  }

  public async updateUserByName(body: RequestFinalUserUpdateDto) {
    const user = await this.userClass.userModel.findOne({
      where: {
        name: body.name,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (body.birthdate) {
      user.birthdate = body.birthdate;
    }
    if (body.languages) {
      user.languages = body.languages;
    }
    if (body.education) {
      await this.queryService.deleteUserRelationshipEducation(user.name);
      let educationNode = await this.educationClass.educationModel.findOne({
        where: {
          degree: body.education.degree,
          institution: body.education.institution,
          area: body.education.area,
        },
      });
      if (!educationNode) {
        educationNode = await this.educationClass.educationModel.createOne({
          uuid: uuidv4(),
          degree: body.education.degree,
          institution: body.education.institution,
          area: body.education.area,
        });
      }
      await user.relateTo({
        alias: 'HasEducation',
        where: {
          uuid: educationNode.uuid,
        },
      });
    }
    if (body.location) {
      await this.queryService.deleteUserRelationshipLocation(user.name);
      let locationNode = await this.locationClass.locationModel.findOne({
        where: {
          postalCode: body.location.postalCode,
          city: body.location.city,
          country: body.location.country,
          region: body.location.region,
        },
      });
      if (!locationNode) {
        locationNode = await this.locationClass.locationModel.createOne({
          uuid: uuidv4(),
          postalCode: body.location.postalCode,
          city: body.location.city,
          country: body.location.country,
          region: body.location.region,
        });
      }
      await user.relateTo({
        alias: 'HasLocation',
        where: {
          uuid: locationNode.uuid,
        },
      });
    }
    if (body.work) {
      await this.queryService.deleteUserRelationshipWork(user.name);
      let workNode = await this.workClass.workModel.findOne({
        where: {
          organization: body.work.organization,
          position: body.work.position,
        },
      });
      if (!workNode) {
        workNode = await this.workClass.workModel.createOne({
          uuid: uuidv4(),
          organization: body.work.organization,
          position: body.work.position,
        });
      }
    }
    if (body.category) {
      await this.queryService.deleteUserRelationshipCategory(user.name);
      const categoryNode =
        await this.occupationCategoryClass.categoryModel.findOne({
          where: {
            name: body.category.name,
          },
        });
      if (!categoryNode) {
        throw new Error('Category not found');
      }
      await user.relateTo({
        alias: 'LikesCategory',
        where: {
          name: categoryNode.name,
        },
      });
    }
    if (body.occupations) {
      await this.queryService.deleteUserRelationshipOccupations(user.name);
      await Promise.all(
        body.occupations.map(async (occupation) => {
          const occupationNode =
            await this.occupationClass.occupationModel.findOne({
              where: {
                name: occupation.name,
              },
            });
          if (!occupationNode) {
            throw new Error('Occupation not found');
          }
          return user.relateTo({
            alias: 'LikesOccupation',
            where: {
              name: occupationNode.name,
            },
          });
        }),
      );
    }
    const dtoData: Record<string, QueryNode[]> = {};
    const updatedUser = await this.userClass.userModel.findOne({
      where: {
        name: body.name,
      },
    });
    if (!updatedUser) {
      throw new Error('Updated user not found');
    }
    const relationsNodes = await this.queryService.queryRelationships(
      updatedUser.name,
    );
    dtoData[user.name] = relationsNodes.records.map(
      (r) => r.get('n') as QueryNode,
    );
    return this.userMapper.apply(updatedUser, dtoData[updatedUser.name]);
  }
}
