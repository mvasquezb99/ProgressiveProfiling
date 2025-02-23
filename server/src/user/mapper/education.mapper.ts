import { ResponseEducationDto } from '../dto/response-education.dto';
import { EducationPropertiesI } from '../user-education.model';

export class EducationMapper {
  static apply(education: EducationPropertiesI): ResponseEducationDto {
    const educationDto = new ResponseEducationDto();
    educationDto.area = education.area;
    educationDto.degree = education.degree;
    educationDto.institution = education.institution;

    return educationDto;
  }
}
