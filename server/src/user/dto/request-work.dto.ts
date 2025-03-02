import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestWorkDto {
  @ApiProperty({ example: 'Software Engineer', description: 'Position' })
  @IsString()
  position: string;

  @ApiProperty({ example: 'Google', description: 'Organization' })
  @IsString()
  organization: string;
}
