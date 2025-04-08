import { ApiProperty } from '@nestjs/swagger';
import { ResponseOccupationDto } from 'src/occupation/dto/response-occupation.dto';

export class ResponseOccupationCategoryDto {
  @ApiProperty({
    example: 'Administración Pública y Gobierno',
    description: 'Occupation category name',
  })
  name: string;
}

export class ResponseOccupationCategoryWithCategoriesDto {
  @ApiProperty({
    example: 'Administración Pública y Gobierno',
    description: 'Occupation category name',
  })
  name: string;
  @ApiProperty({
    description: 'Occupations',
  })
  occupations: ResponseOccupationDto[];
}
