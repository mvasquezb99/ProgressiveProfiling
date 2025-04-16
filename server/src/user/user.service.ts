import { Inject, Injectable } from '@nestjs/common';
import { UserClass, UserPropertiesI } from './user.model';
import { ResponseUserDto } from './dto/response-user.dto';
import { ProfilerService } from 'src/profiler/profiler.service';
import { RequestInfoAlgorithmDto } from './dto/request-info-algorithm.dto';
import { RequestFinalUserDto } from './dto/request-final-user.dto';
import { UserMapper } from './mapper/user.mapper';
import { EducationClass } from './user-education.model';
import { WorkClass } from './user-work.model';
import { LocationClass } from './user-location.model';
import { EducationMapper } from './mapper/education.mapper';
import { WorkMapper } from './mapper/work.mapper';
import { LocationMapper } from './mapper/location.mapper';
import { ResponseProfilerDto } from 'src/profiler/dto/response-profiler.dto';
import { QueryNode, QueryService } from 'src/query/query.service';
import { name } from 'ejs';

@Injectable()
export class UserService {
  constructor(
    private readonly userClass: UserClass,
    private readonly userMapper: UserMapper,
    private readonly educationMapper: EducationMapper,
    private readonly workMapper: WorkMapper,
    private readonly locationMapper: LocationMapper,
    @Inject(QueryService) private readonly queryService: QueryService,
    @Inject(ProfilerService) private readonly profilerService: ProfilerService,
    @Inject(EducationClass) private readonly educationClass: EducationClass,
    @Inject(WorkClass) private readonly workClass: WorkClass,
    @Inject(LocationClass) private readonly locationClass: LocationClass,
  ) {}

  public async findByName(name: string): Promise<ResponseUserDto> {
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

  public async findAll(): Promise<ResponseUserDto[]> {
    const dtoData: Record<string, QueryNode[]> = {};
    const users = await this.userClass.userModel.findMany();

    await Promise.all(
      users.map(async (user) => {
        const relationsNodes = await this.queryService.queryRelationships(
          user.name,
        );
        dtoData[user.name] = relationsNodes.records.map(
          (r) => r.get('n') as QueryNode,
        );
      }),
    );

    return users.map((user) => this.userMapper.apply(user, dtoData[user.name]));
  }

  public async findByCategory(category: string): Promise<ResponseUserDto[]> {
    const dtoData: Record<string, QueryNode[]> = {};
    const userNodes =
      await this.queryService.queryUsersWithCategoryAndSimilar(category);
    const users = userNodes.records.map((r) => r.get('u') as QueryNode);
    const usersProp = users.map((u) => u.properties as UserPropertiesI);
    await Promise.all(
      usersProp.map(async (user) => {
        const relationsNodes = await this.queryService.queryRelationships(
          user.name,
        );
        dtoData[user.name] = relationsNodes.records.map(
          (r) => r.get('n') as QueryNode,
        );
      }),
    );

    return usersProp.map((user) =>
      this.userMapper.apply(user, dtoData[user.name]),
    );
  }

  public generateProfile(body: RequestInfoAlgorithmDto): ResponseProfilerDto {
    return this.profilerService.profilingAlgorithm(body);
  }

  public async findAllRegular(): Promise<ResponseUserDto[]> {
    const dtoData: Record<string, QueryNode[]> = {};
    const users = await this.userClass.userModel.findMany({
      where: {
        type: 'regular',
      },
    });

    await Promise.all(
      users.map(async (user) => {
        const relationsNodes = await this.queryService.queryRelationships(
          user.name,
        );
        dtoData[user.name] = relationsNodes.records.map(
          (r) => r.get('n') as QueryNode,
        );
      }),
    );

    return users.map((user) => this.userMapper.apply(user, dtoData[user.name]));
  }

  public async saveUser(user: RequestFinalUserDto): Promise<void> {
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
  }
}
