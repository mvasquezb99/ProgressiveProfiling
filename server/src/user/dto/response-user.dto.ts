import { ApiProperty } from '@nestjs/swagger';
import { UserPropertiesI } from '../user.model';
import { ResponseEducationDto } from './response-education.dto';
import { ResponseLocationDto } from './response-location.dto';
import { ResponseWorkDto } from './response-work.dto';
import { LocationMapper } from '../mapper/location.mapper';
import { EducationMapper } from '../mapper/education.mapper';
import { WorkMapper } from '../mapper/work.mapper';
import { UserMapper } from '../mapper/user.mapper';
import { QueryNode } from 'src/scripts/queries';
import { LocationPropertiesI } from '../user-location.model';
import { EducationPropertiesI } from '../user-education.model';
import { WorkPropertiesI } from '../user-work.model';
import { ResponseOccupationCategoryDto } from 'src/occupation-category/dto/response-occupation-category.dto';
import { CategoryPropertiesI } from 'src/occupation-category/occupation-category.model';
import { OccupationCategoryMapper } from 'src/occupation-category/mapper/occupation-category.mapper';

export class ResponseUserDto {
  @ApiProperty({
    example: 'sample',
    description: 'User type (sample | regular)',
  })
  type: string;
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  name: string;
  @ApiProperty({ example: 'JohnDoe@example.com', description: 'User email' })
  email: string;
  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'User image',
  })
  image: string;
  @ApiProperty({ example: '1990-01-01', description: 'User birthdate' })
  birthdate: string;
  @ApiProperty({
    example: 'Software Engineer, Web Developer',
    description: 'User skills',
  })
  skills: string;
  @ApiProperty({
    example: 'English, Spanish',
    description: 'User languages',
  })
  languages: string;
  @ApiProperty({
    example: '{ degree: "Bachelor", institution: "MIT", area: "Biology" }',
    description: 'User education',
  })
  education: ResponseEducationDto;
  @ApiProperty({
    example:
      '{ postalCode: "89472-3818", city: "San Francisco", country: "United States", region: "California" }',
    description: 'User location',
  })
  location: ResponseLocationDto;
  @ApiProperty({
    example: '{ position: "Software Engineer", organization: "Google" }',
    description: 'User work experience',
  })
  work: ResponseWorkDto;
  @ApiProperty({
    example: '{ name: "Tecnology" }',
    description: 'User occupation category',
  })
  category: ResponseOccupationCategoryDto[];

  static apply(
    user: UserPropertiesI,
    relationships: QueryNode[] = [],
  ): ResponseUserDto {
    const userDto = UserMapper.apply(user);

    for (let i = 0; i < relationships.length; i++) {
      const element: QueryNode = relationships[i];
      console.log(element);
      switch (element.labels[0]) {
        case 'Location':
          userDto.location = LocationMapper.apply(
            element.properties as LocationPropertiesI,
          );
          break;
        case 'Education':
          userDto.education = EducationMapper.apply(
            element.properties as EducationPropertiesI,
          );
          break;
        case 'Work':
          userDto.work = WorkMapper.apply(
            element.properties as WorkPropertiesI,
          );
          break;
        case 'Category':
          userDto.category.push(
            OccupationCategoryMapper.apply(
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
}
