import { Injectable } from '@nestjs/common';
import { ResponseLocationDto } from '../dto/response-location.dto';
import { LocationPropertiesI } from '../user-location.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LocationMapper {
  public toResponse(location: LocationPropertiesI): ResponseLocationDto {
    const locationDto = new ResponseLocationDto();

    locationDto.city = location.city;
    locationDto.country = location.country;
    locationDto.postalCode = location.postalCode;
    locationDto.region = location.region;

    return locationDto;
  }

  public toProperties(location: ResponseLocationDto): LocationPropertiesI {
    const locationProp: LocationPropertiesI = {
      uuid: uuidv4(),
      city: location.city,
      country: location.country,
      postalCode: location.postalCode,
      region: location.region,
    };
    return locationProp;
  }
}
