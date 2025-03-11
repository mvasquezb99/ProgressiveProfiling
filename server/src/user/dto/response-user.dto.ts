import { ApiProperty } from '@nestjs/swagger';
import { ResponseEducationDto } from './response-education.dto';
import { ResponseLocationDto } from './response-location.dto';
import { ResponseWorkDto } from './response-work.dto';
import { ResponseOccupationCategoryDto } from 'src/occupation-category/dto/response-occupation-category.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
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
    example: '[{ name: "Tecnology" }, { name: "Business" }]',
    description: 'User occupation category',
  })
  categories: ResponseOccupationCategoryDto[];

  @ApiProperty({
    example: '[{ name: "Operations Manager" }, { name: "Software Developer" }]',
    description: 'User occupation',
  })
  occupations: ResponseOccupationCategoryDto[];
}
