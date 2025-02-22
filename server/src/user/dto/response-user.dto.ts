import { ApiProperty } from '@nestjs/swagger';
import { UserPropertiesI } from '../user.model';
import { ResponseEducationDto } from './response-education.dto';
import { ResponseLocationDto } from './response-location.dto';
import { ResponseWorkDto } from './response-work.dto';
import { LocationMapper } from '../mapper/location.mapper';
import { EducationMapper } from '../mapper/education.mapper';
import { WorkMapper } from '../mapper/work.mapper';
import { UserMapper } from '../mapper/user.mapper';

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

  education: ResponseEducationDto;

  location: ResponseLocationDto;

  work: ResponseWorkDto;

  static apply(user: UserPropertiesI, relationships: Node[] = []): ResponseUserDto {

    const userDto = UserMapper.apply(user);

    for (let i = 0; i < relationships.length; i++) {
      const element: Node = relationships[i];

      switch (element['labels'][0]) {
        case "Location":
          userDto.location = LocationMapper.apply(element['properties']);
          break;
        case "Education":
          userDto.education = EducationMapper.apply(element['properties']);
          break;
        case "Work":
          userDto.work = WorkMapper.apply(element['properties']);
          break;
        default:
          break;

      }
    }

    return userDto;
  }


}
