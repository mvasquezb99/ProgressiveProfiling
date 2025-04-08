import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested, IsOptional, IsArray } from 'class-validator';
import { RequestOccupationCategoryDto } from 'src/occupation-category/dto/request-occupation-category.dto';
import { RequestOccupationDto } from 'src/occupation/dto/request-occupation.dto';
import { RequestEducationDto } from 'src/user/dto/request-education.dto';
import { RequestLocationDto } from 'src/user/dto/request-location.dto';
import { RequestWorkDto } from 'src/user/dto/request-work.dto';

export class RelateCategoryWithOccupationDto {
  @ApiPropertyOptional({
    example: '{ name: "Technology" }',
    description: 'Occupation category',
  })
  @ValidateNested()
  @Type(() => RequestOccupationCategoryDto)
  category: RequestOccupationCategoryDto;

  @ApiPropertyOptional({
    example: '{ name: "Software Engineering" }',
    description: 'Occupation category',
  })
  @ValidateNested()
  @Type(() => RequestOccupationDto)
  occupation: RequestOccupationDto;
}

export class UpdateRelationshipsDto {
  @ApiPropertyOptional({
    example: '{ degree: "Bachelor", institution: "MIT", area: "Biology" }',
    description: 'User education',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RequestEducationDto)
  education?: RequestEducationDto;

  @ApiPropertyOptional({
    example:
      '{ postalCode: "89472-3818", city: "San Francisco", country: "United States", region: "California" }',
    description: 'User location',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RequestLocationDto)
  location?: RequestLocationDto;

  @ApiPropertyOptional({
    example: '{ company: "Google", position: "Software Engineer" }',
    description: 'User work details',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RequestWorkDto)
  work?: RequestWorkDto;

  @ApiPropertyOptional({
    example: '[{ name: "Technology" }, { name: "Business" }]',
    description: 'User occupation category',
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => RequestOccupationCategoryDto)
  category?: RequestOccupationCategoryDto;

  @ApiPropertyOptional({
    example: '[{ name: "Operations Manager" }, { name: "Software Developer" }]',
    description: 'User occupation',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RequestOccupationDto)
  occupations?: RequestOccupationDto[];
}
