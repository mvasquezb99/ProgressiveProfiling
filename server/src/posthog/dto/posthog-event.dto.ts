import { ApiProperty } from '@nestjs/swagger';

class Properties {
  @ApiProperty()
  occupations: string[];

  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;
}

export class PosthogEventDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  distinct_id: string;

  @ApiProperty()
  properties: Properties;

  @ApiProperty()
  event: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty()
  person: string;

  @ApiProperty()
  elements: string;

  @ApiProperty()
  elements_chain: string;
}
