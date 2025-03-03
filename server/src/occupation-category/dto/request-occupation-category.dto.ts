import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestOccupationCategoryDto {
  @ApiProperty({
    example: 'Public Administration and Government',
    description: 'Occupation category name',
  })
  @IsString()
  name: string;
}
