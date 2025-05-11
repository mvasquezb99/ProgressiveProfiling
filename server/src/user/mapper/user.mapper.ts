import { Inject, Injectable } from '@nestjs/common';
import { RequestFinalUserDto } from '../dto/request-final-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { Type, UserPropertiesI } from '../user.model';
import { OccupationCategoryMapper } from 'src/occupation-category/mapper/occupation-category.mapper';
import { CategoryPropertiesI } from 'src/occupation-category/occupation-category.model';
import { EducationPropertiesI } from '../user-education.model';
import { LocationPropertiesI } from '../user-location.model';
import { WorkPropertiesI } from '../user-work.model';
import { EducationMapper } from './education.mapper';
import { LocationMapper } from './location.mapper';
import { WorkMapper } from './work.mapper';
import { QueryNode } from 'src/query/query.service';
import { RequestUserDto } from '../dto/request-user.dto';

@Injectable()
export class UserMapper {
  constructor(
    private readonly locationMapper: LocationMapper,
    private readonly educationMapper: EducationMapper,
    private readonly workMapper: WorkMapper,
    @Inject(OccupationCategoryMapper)
    private readonly occupationCategoryMapper: OccupationCategoryMapper,
  ) {}

  public apply(
    user: UserPropertiesI,
    relationships: QueryNode[] = [],
  ): ResponseUserDto {
    const userDto = this.toResponse(user);

    for (let i = 0; i < relationships.length; i++) {
      const element: QueryNode = relationships[i];
      switch (element.labels[0]) {
        case 'Location':
          userDto.location = this.locationMapper.toResponse(
            element.properties as LocationPropertiesI,
          );
          break;
        case 'Education':
          userDto.education = this.educationMapper.toResponse(
            element.properties as EducationPropertiesI,
          );
          break;
        case 'Work':
          userDto.work = this.workMapper.toResponse(
            element.properties as WorkPropertiesI,
          );
          break;
        case 'Category':
          userDto.categories.push(
            this.occupationCategoryMapper.toResponse(
              element.properties as CategoryPropertiesI,
            ),
          );
          break;
        case 'Occupation':
          userDto.occupations.push(
            this.occupationCategoryMapper.toResponse(
              element.properties as CategoryPropertiesI,
            ),
          );
          break;
        default:
          break;
      }
    }
    return userDto;
  }

  public toResponse(user: UserPropertiesI): ResponseUserDto {
    const userDto = new ResponseUserDto();

    userDto.type = user.type;
    userDto.name = user.name;
    userDto.email = user.email;
    userDto.image = user.image;
    userDto.birthdate = user.birthdate;
    userDto.skills = user.skills;
    userDto.languages = user.languages;
    userDto.categories = [];
    userDto.occupations = [];
    userDto.promSalary = user.promSalary || '';
    userDto.numApplications = user.numApplications || 0;

    return userDto;
  }

  public toProperties(user: RequestFinalUserDto): UserPropertiesI {
    const userProp: UserPropertiesI = {
      type: Type.REGULAR,
      name: user.name,
      email: user.email,
      image: '',
      birthdate: user.birthdate,
      skills: '',
      languages: user.languages,
    };
    return userProp;
  }

  public toPropertiesFromNormalDto(user: RequestUserDto): UserPropertiesI {
    const userProp: UserPropertiesI = {
      type: Type.REGULAR,
      name: user.name,
      email: '',
      image: '',
      birthdate: '',
      skills: user.skills,
      languages: user.languages,
    };
    return userProp;
  }
}
