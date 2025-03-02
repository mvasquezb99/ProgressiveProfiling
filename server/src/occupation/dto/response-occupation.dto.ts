import { ApiProperty } from '@nestjs/swagger';

export class ResponseOccupationDto {
  @ApiProperty({ example: 'Web Developer', description: 'Occupation name' })
  name: string;
}
