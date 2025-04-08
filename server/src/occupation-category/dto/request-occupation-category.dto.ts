import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class RequestOccupationCategoryArrayDto {
  @ValidateNested({ each: true })
  @Type(() => RequestOccupationCategoryDto)
  categories: RequestOccupationCategoryDto[];
}

export class RequestOccupationCategoryDto {
  @ApiProperty({
    example: 'Public Administration and Government',
    description: 'Occupation category name',
  })
  @IsString()
  name: string;
}
