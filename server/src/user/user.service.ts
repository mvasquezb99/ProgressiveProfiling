import { Injectable } from '@nestjs/common';
import { UserClass } from './user.model';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userClass: UserClass) { }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userClass.userModel.findMany();

    return users.map((user) => ({
      type: user.type,
      name: user.name,
      email: user.email,
      image: user.image,
      birthdate: user.birthdate,
      skills: user.skills,
      languages: user.languages,
    }));
  }
}
