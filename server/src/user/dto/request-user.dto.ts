import { ApiProperty } from '@nestjs/swagger';
import {
  IsInstance,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { RequestEducationDto } from './request-education.dto';
import { RequestLocationDto } from './request-location.dto';
import { RequestWorkDto } from './request-work.dto';
import { RequestOccupationCategoryDto } from 'src/occupation-category/dto/request-occupation-category.dto';
import { Type } from 'class-transformer';
import { RequestOccupationDto } from 'src/occupation/dto/request-occupation.dto';

export class RequestUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Software Engineer, Web Developer',
    description: 'User skills',
  })
  @IsString()
  skills: string;

  @ApiProperty({
    example: 'English, Spanish',
    description: 'User languages',
  })
  @IsString()
  languages: string;

  @ApiProperty({
    example: '{ degree: "Bachelor", institution: "MIT", area: "Biology" }',
    description: 'User education',
  })
  @ValidateNested()
  @Type(() => RequestEducationDto)
  @IsNotEmptyObject()
  education: RequestEducationDto;

  @ApiProperty({
    example:
      '{ postalCode: "89472-3818", city: "San Francisco", country: "United States", region: "California" }',
    description: 'User location',
  })
  @ValidateNested()
  @Type(() => RequestLocationDto)
  @IsNotEmptyObject()
  location: RequestLocationDto;

  @ApiProperty({
    example: '{ position: "Software Engineer", organization: "Google" }',
    description: 'User work experience',
  })
  @ValidateNested()
  @Type(() => RequestWorkDto)
  @IsNotEmptyObject()
  work: RequestWorkDto;

  @ApiProperty({
    example: '[{ name: "Tecnology" }, { name: "Business" }]',
    description: 'User occupation category',
  })
  @IsInstance(Array<RequestOccupationCategoryDto>)
  categories: RequestOccupationCategoryDto[];

  @ApiProperty({
    example: '[{ name: "Operations Manager" }, { name: "Software Developer" }]',
    description: 'User occupation',
  })
  @IsInstance(Array<RequestOccupationDto>)
  occupations: RequestOccupationDto[];
}
