import { Injectable } from '@nestjs/common';
import { RequestInfoDto } from 'src/user/dto/request-info.dto';
import { RequestUserDto } from 'src/user/dto/request-user.dto';

@Injectable()
export class ProfilerService {
  private userWeighed: any = {
    languages: {},
    education: {},
    work: {},
    category: {},
  };

  constructor() { }

  weighLikedUsers = (likedUsers: RequestUserDto[], value: number) => {
    likedUsers.forEach((user) => {
      user.languages.split(',').forEach((currLanguage) => {
        this.userWeighed.languages[currLanguage] = this.userWeighed.languages[
          currLanguage
        ]
          ? this.userWeighed.languages[currLanguage] + value
          : value;
      });

      this.userWeighed.education[user.education.area] = this.userWeighed
        .education[user.education.area]
        ? this.userWeighed.education[user.education.area] + value
        : value;

      this.userWeighed.work[user.work.position] = this.userWeighed.work[
        user.work.position
      ]
        ? this.userWeighed.work[user.work.position] + value
        : value;

      user.category.forEach((category) => {
        this.userWeighed.category[category.name] = this.userWeighed.category[
          category.name
        ]
          ? this.userWeighed.category[category.name] + value
          : value;
      });
    });
  };

  profilingAlgorithm(body: RequestInfoDto) {
    this.weighLikedUsers(body.likedUsers, 1);
    this.weighLikedUsers(body.superLikedUsers, 10);
    this.weighLikedUsers(body.dislikedUsers, -1);

    console.log(this.userWeighed);
  }
}
