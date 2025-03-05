import { RequestFinalUserDto } from '../dto/request-final-user.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { Type, UserPropertiesI } from '../user.model';

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

  public static toProperties(user: RequestFinalUserDto): UserPropertiesI {
    const userProp: UserPropertiesI = {
      type: Type.REGULAR,
      name: user.name,
      email: '',
      image: '',
      birthdate: user.birthdate,
      skills: '',
      languages: user.languages,
    };
    return userProp;
  }
}
