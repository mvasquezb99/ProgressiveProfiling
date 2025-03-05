import { RequestEducationDto } from '../dto/request-education.dto';
import { ResponseEducationDto } from '../dto/response-education.dto';
import { EducationPropertiesI } from '../user-education.model';
import { v4 as uuidv4 } from 'uuid';

export class EducationMapper {
  static apply(education: EducationPropertiesI): ResponseEducationDto {
    const educationDto = new ResponseEducationDto();
    educationDto.area = education.area;
    educationDto.degree = education.degree;
    educationDto.institution = education.institution;

    return educationDto;
  }

  public static toProperties(
    education: RequestEducationDto,
  ): EducationPropertiesI {
    const educationProp: EducationPropertiesI = {
      uuid: uuidv4(),
      area: education.area,
      degree: education.degree,
      institution: education.institution,
    };
    return educationProp;
  }
}
