import { ResponseWorkDto } from '../dto/response-work.dto';

export class WorkMapper {
    static apply(work: Node): ResponseWorkDto {
        const workDto = new ResponseWorkDto();

        workDto.organization = work['organization']
        workDto.position = work['position']

        return workDto;
    }
}