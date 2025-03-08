import { Injectable } from '@nestjs/common';
import { ResponseWorkDto } from '../dto/response-work.dto';
import { WorkPropertiesI } from '../user-work.model';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WorkMapper {
  public toResponse(work: WorkPropertiesI): ResponseWorkDto {
    const workDto = new ResponseWorkDto();

    workDto.organization = work.organization;
    workDto.position = work.position;

    return workDto;
  }

  public toProperties(work: ResponseWorkDto): WorkPropertiesI {
    const workProp: WorkPropertiesI = {
      uuid: uuidv4(),
      organization: work.organization,
      position: work.position,
    };
    return workProp;
  }
}
