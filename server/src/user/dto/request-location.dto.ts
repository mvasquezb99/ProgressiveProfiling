/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestLocationDto {
  @ApiProperty({
    example: '89472-3818',
    description: 'Postal code',
  })
  @IsString()
  postalCode: string;

  @ApiProperty({
    example: 'San Francisco',
    description: 'City',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'United States',
    description: 'Country',
  })
  @IsString()
  country: string;

  @ApiProperty({
    example: 'California',
    description: 'Region',
  })
  @IsString()
  region: string;
}
