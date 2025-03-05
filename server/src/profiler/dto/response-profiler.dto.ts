import { ApiProperty } from '@nestjs/swagger';
import { ResponseOccupationCategoryDto } from 'src/occupation-category/dto/response-occupation-category.dto';
import { ResponseOccupationDto } from 'src/occupation/dto/response-occupation.dto';
import { ResponseEducationDto } from 'src/user/dto/response-education.dto';
import { ResponseWorkDto } from 'src/user/dto/response-work.dto';

export class ResponseProfilerDto {
  @ApiProperty({ example: '[ "English", "Spanish" ]' })
  languages: string[];

  @ApiProperty({
    example: '[{ degree: "Bachelor", institution: "MIT", area: "Biology" }, ]',
    description: 'User education',
  })
  eaducation: ResponseEducationDto[];

  @ApiProperty({
    example: '{ position: "Software Engineer", organization: "Google" }',
    description: 'User work experience',
  })
  work: ResponseWorkDto[];

  @ApiProperty({
    example: '[{ name: "Tecnology" }, { name: "Business" }]',
    description: 'User occupation category',
  })
  categories: ResponseOccupationCategoryDto[];

  @ApiProperty({
    example: '[{ name: "Operations Manager" }, { name: "Software Developer" }]',
    description: 'User occupation',
  })
  occupations: ResponseOccupationDto[];
}
