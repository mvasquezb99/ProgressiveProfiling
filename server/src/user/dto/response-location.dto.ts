import { ApiProperty } from '@nestjs/swagger';
import { LocationPropertiesI } from '../user-location.model';

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

  static apply(location: LocationPropertiesI): ResponseLocationDto{
    const dto = new ResponseLocationDto();

    dto.country = location.country
    dto.city = location.city
    dto.postalCode = location.postalCode
    dto.region = location.region

    return dto;
  }
}
