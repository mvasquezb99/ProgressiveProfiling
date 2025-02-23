import { ApiProperty } from '@nestjs/swagger';

export class ResponseEducationDto {
  @ApiProperty({ example: 'Bachelor', description: 'Degree' })
  degree: string;
  @ApiProperty({ example: 'MIT', description: 'Major' })
  institution: string;
  @ApiProperty({ example: 'Biology', description: 'Area' })
  area: string;
}
