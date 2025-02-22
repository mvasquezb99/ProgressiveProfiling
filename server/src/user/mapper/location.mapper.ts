import { ResponseLocationDto } from '../dto/response-location.dto';

export class LocationMapper {
    static apply(location: Node): ResponseLocationDto {
        const locationDto = new ResponseLocationDto();

        locationDto.city = location['city']
        locationDto.country = location['country']
        locationDto.postalCode = location['postalCode']
        locationDto.region = location['region']

        return locationDto;
    }
}