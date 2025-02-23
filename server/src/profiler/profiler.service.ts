import { Injectable } from '@nestjs/common';
import { RequestUserDto } from 'src/user/dto/request-user.dto';

@Injectable()
export class ProfilerService {
  profilingAlgorithm(body: RequestUserDto[]) {
    return (
      'From liked users: ' + JSON.stringify(body) + '\nGenerating profile...'
    );
  }
}
