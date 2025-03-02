/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestEducationDto {
  @ApiProperty({ example: 'Bachelor', description: 'Degree' })
  @IsString()
  degree: string;

  @ApiProperty({ example: 'MIT', description: 'Major' })
  @IsString()
  institution: string;

  @ApiProperty({ example: 'Biology', description: 'Area' })
  @IsString()
  area: string;
}
