import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestOccupationDto {
  @ApiProperty({ example: 'Web Developer', description: 'Occupation name' })
  @IsString()
  name: string;
}
