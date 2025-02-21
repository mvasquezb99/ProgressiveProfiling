import { ApiProperty } from '@nestjs/swagger';

export class ResponseWorkDto {
  @ApiProperty({ example: 'Software Engineer', description: 'Position' })
  position: string;
  @ApiProperty({ example: 'Google', description: 'Organization' })
  organization: string;
}
