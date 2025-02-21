import { ApiProperty } from '@nestjs/swagger';

export class ResponseOccupationCategoryDto {
  @ApiProperty({
    example: 'Administración Pública y Gobierno',
    description: 'Occupation category name',
  })
  name: string;
}
