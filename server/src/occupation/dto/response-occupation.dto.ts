import { ApiProperty } from '@nestjs/swagger';

export class ResponseOccupationDto {
  public constructor(name: string) {
    this.name = name;
  }

  @ApiProperty({ example: 'Web Developer', description: 'Occupation name' })
  name: string;
}
