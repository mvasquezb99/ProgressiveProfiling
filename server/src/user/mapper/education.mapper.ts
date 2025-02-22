import { ResponseEducationDto } from '../dto/response-education.dto';
import { ResponseLocationDto } from '../dto/response-location.dto';

export class EducationMapper {
    static apply(education: Node): ResponseEducationDto {
        const educationDto = new ResponseEducationDto();

        educationDto.area = education['area']
        educationDto.degree = education['degree']
        educationDto.institution = education['institution']

        return educationDto;
    }
}