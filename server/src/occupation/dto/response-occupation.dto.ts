import { ApiProperty } from '@nestjs/swagger';

export class ResponseOccupationDto {
  @ApiProperty({ example: 'Abogados', description: 'Occupation name' })
  name: string;
}
