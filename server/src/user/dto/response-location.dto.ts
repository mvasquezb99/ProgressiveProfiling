import { ApiProperty } from '@nestjs/swagger';

export class ResponseLocationDto {
  @ApiProperty({
    example: '89472-3818',
    description: 'Postal code',
  })
  postalCode: string;
  @ApiProperty({
    example: 'San Francisco',
    description: 'City',
  })
  city: string;
  @ApiProperty({
    example: 'United States',
    description: 'Country',
  })
  country: string;
  @ApiProperty({
    example: 'California',
    description: 'Region',
  })
  region: string;
}
