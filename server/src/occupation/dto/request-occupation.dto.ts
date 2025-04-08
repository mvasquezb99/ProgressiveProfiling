import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

export class RequestOccupationArrayDto {
  @ValidateNested({ each: true })
  @Type(() => RequestOccupationDto)
  occupations: RequestOccupationDto[];
}

export class RequestOccupationDto {
  @ApiProperty({ example: 'Web Developer', description: 'Occupation name' })
  @IsString()
  name: string;
}
