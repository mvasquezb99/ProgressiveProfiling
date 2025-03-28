import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  ValidateNested,
  IsNotEmptyObject,
  IsInstance,
} from 'class-validator';
import { RequestOccupationCategoryDto } from 'src/occupation-category/dto/request-occupation-category.dto';
import { RequestLocationDto } from './request-location.dto';
import { RequestOccupationDto } from 'src/occupation/dto/request-occupation.dto';
import { RequestEducationDto } from './request-education.dto';
import { RequestWorkDto } from './request-work.dto';

export class RequestFinalUserArrayDto {
  @ValidateNested({ each: true })
  @Type(() => RequestFinalUserDto)
  users: RequestFinalUserDto[];
}

export class RequestFinalUserDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsString()
  name: string;

  @ApiProperty({ example: '1990-01-01', description: 'User birthdate' })
  @IsString()
  birthdate: string;

  @ApiProperty({
    example: 'Spanish, English',
    description: 'User languages',
  })
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
  location: RequestLocationDto;

  @ValidateNested()
  @Type(() => RequestWorkDto)
  @IsNotEmptyObject()
  work: RequestWorkDto;

  @ApiProperty({
    example: '[{ name: "Tecnology" }, { name: "Business" }]',
    description: 'User occupation category',
  })
  @ValidateNested()
  @Type(() => RequestOccupationCategoryDto)
  @IsNotEmptyObject()
  category: RequestOccupationCategoryDto;

  @ApiProperty({
    example: '[{ name: "Operations Manager" }, { name: "Software Developer" }]',
    description: 'User occupation',
  })
  @IsInstance(Array<RequestOccupationDto>)
  occupations: RequestOccupationDto[];
}
