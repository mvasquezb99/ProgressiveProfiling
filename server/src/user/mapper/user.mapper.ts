import { ResponseUserDto } from '../dto/response-user.dto';
import { UserPropertiesI } from '../user.model';

export class UserMapper {
  static apply(user: UserPropertiesI): ResponseUserDto {
    const userDto = new ResponseUserDto();

    userDto.type = user.type;
    userDto.name = user.name;
    userDto.email = user.email;
    userDto.image = user.image;
    userDto.birthdate = user.birthdate;
    userDto.skills = user.skills;
    userDto.languages = user.languages;
    userDto.categories = [];
    userDto.occupations = [];

    return userDto;
  }
}
