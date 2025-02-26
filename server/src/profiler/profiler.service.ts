import { Injectable } from '@nestjs/common';
import { RequestInfoDto } from 'src/user/dto/request-info.dto';

@Injectable()
export class ProfilerService {
  profilingAlgorithm(body: RequestInfoDto) {
    return (
      'From liked users: ' + JSON.stringify(body) + '\nGenerating profile...'
    );
  }
}
