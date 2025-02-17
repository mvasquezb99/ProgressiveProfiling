import { Injectable } from '@nestjs/common';
import { UserClass } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly userClass: UserClass) {}

  async findAll() {
    return await this.userClass.userModel.findMany();
  }
}
