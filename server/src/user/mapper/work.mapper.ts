import { ResponseWorkDto } from '../dto/response-work.dto';
import { WorkPropertiesI } from '../user-work.model';

export class WorkMapper {
  static apply(work: WorkPropertiesI): ResponseWorkDto {
    const workDto = new ResponseWorkDto();

    workDto.organization = work.organization;
    workDto.position = work.position;

    return workDto;
  }
}
