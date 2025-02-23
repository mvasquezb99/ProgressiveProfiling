import { ResponseLocationDto } from '../dto/response-location.dto';
import { LocationPropertiesI } from '../user-location.model';

export class LocationMapper {
  static apply(location: LocationPropertiesI): ResponseLocationDto {
    const locationDto = new ResponseLocationDto();

    locationDto.city = location.city;
    locationDto.country = location.country;
    locationDto.postalCode = location.postalCode;
    locationDto.region = location.region;

    return locationDto;
  }
}
