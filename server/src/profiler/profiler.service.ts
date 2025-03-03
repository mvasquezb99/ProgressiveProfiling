import { Injectable } from '@nestjs/common';
import { RequestOccupationCategoryDto } from 'src/occupation-category/dto/request-occupation-category.dto';
import { RequestOccupationDto } from 'src/occupation/dto/request-occupation.dto';
import { RequestInfoDto } from 'src/user/dto/request-info.dto';
import { RequestUserDto } from 'src/user/dto/request-user.dto';

export type UserWeighed = {
  languages: Record<string, number>;
  education: Record<string, number>;
  work: Record<string, number>;
  categories: Record<string, number>;
  occupations: Record<string, number>;
};

@Injectable()
export class ProfilerService {
  private userWeighed: UserWeighed = {
    languages: {},
    education: {},
    work: {},
    categories: {},
    occupations: {},
  };

  weighLikedUsers = (listUsers: RequestUserDto[], value: number) => {
    listUsers.forEach((user) => {
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

      user.categories.forEach((category: RequestOccupationCategoryDto) => {
        this.userWeighed.categories[category.name] = this.userWeighed
          .categories[category.name]
          ? this.userWeighed.categories[category.name] + value
          : value;
      });

      user.occupations.forEach((occupation: RequestOccupationDto) => {
        this.userWeighed.occupations[occupation.name] = this.userWeighed
          .occupations[occupation.name]
          ? this.userWeighed.occupations[occupation.name] + value
          : value;
      });
    });
  };

  profilingAlgorithm(body: RequestInfoDto) {
    this.weighLikedUsers(body.likedUsers, 1);
    this.weighLikedUsers(body.superLikedUsers, 10);
    this.weighLikedUsers(body.dislikedUsers, -1);

    return this.userWeighed;
  }
}
