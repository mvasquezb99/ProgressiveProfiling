import { Injectable } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
import { UserService } from 'src/user/user.service';

// TODO:
// CRON job to send all regular users to an endpoint from Magneto
// The endpoint should be in the config file
@Injectable()
export class MagnetoService {
  constructor(private readonly userService: UserService) {}

  // @Cron('0 10 * * *') // Every day at 10 AM
}
