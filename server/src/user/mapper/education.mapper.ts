import { Injectable } from '@nestjs/common';
import { RequestEducationDto } from '../dto/request-education.dto';
import { ResponseEducationDto } from '../dto/response-education.dto';
import { EducationPropertiesI } from '../user-education.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EducationMapper {
  public toResponse(education: EducationPropertiesI): ResponseEducationDto {
    const educationDto = new ResponseEducationDto();
    educationDto.area = education.area;
    educationDto.degree = education.degree;
    educationDto.institution = education.institution;

    return educationDto;
  }

  public toProperties(education: RequestEducationDto): EducationPropertiesI {
    const educationProp: EducationPropertiesI = {
      uuid: uuidv4(),
      area: education.area,
      degree: education.degree,
      institution: education.institution,
    };
    return educationProp;
  }
}
