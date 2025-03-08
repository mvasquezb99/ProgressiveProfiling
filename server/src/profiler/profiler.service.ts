import { Injectable } from '@nestjs/common';
import { RequestOccupationCategoryDto } from 'src/occupation-category/dto/request-occupation-category.dto';
import { RequestOccupationDto } from 'src/occupation/dto/request-occupation.dto';
import { RequestEducationDto } from 'src/user/dto/request-education.dto';
import { RequestInfoAlgorithmDto } from 'src/user/dto/request-info-algorithm.dto';
import { RequestUserDto } from 'src/user/dto/request-user.dto';
import { RequestWorkDto } from 'src/user/dto/request-work.dto';
import { ResponseProfilerDto } from './dto/response-profiler.dto';
import { ProfilerMapper } from './mapper/profiler.mapper';
import { ConfigService } from '@nestjs/config';

export type UserWeighed = {
  languages: Map<string, number>;
  education: Map<RequestEducationDto, number>;
  work: Map<RequestWorkDto, number>;
  categories: Map<RequestOccupationCategoryDto, number>;
  occupations: Map<RequestOccupationDto, number>;
};

@Injectable()
export class ProfilerService {
  private userWeighed: UserWeighed = {
    languages: new Map(),
    education: new Map(),
    work: new Map(),
    categories: new Map(),
    occupations: new Map(),
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly profilerMapper: ProfilerMapper,
  ) { }

  private weighLikedUsers(listUsers: RequestUserDto[], value: number): void {
    listUsers.forEach((user) => {
      user.languages.split(',').forEach((currLanguage) => {
        currLanguage = currLanguage.trim();
        const currentWeight = this.userWeighed.languages.get(currLanguage) || 0;
        this.userWeighed.languages.set(currLanguage, currentWeight + value);
      });

      const educationArea = user.education;
      const existingEducationKey = this.findExistingEducation(
        this.userWeighed.education,
        educationArea.degree,
        educationArea.institution,
        educationArea.area,
      );

      const currentEducationWeight = existingEducationKey
        ? this.userWeighed.education.get(existingEducationKey) || 0
        : 0;

      this.userWeighed.education.set(
        existingEducationKey || educationArea,
        currentEducationWeight + value,
      );

      const workPosition = user.work;
      const existingWorkKey = this.findExistingWork(
        this.userWeighed.work,
        workPosition.position,
        workPosition.organization,
      );

      const currentWorkWeight = existingWorkKey
        ? this.userWeighed.work.get(existingWorkKey) || 0
        : 0;

      this.userWeighed.work.set(
        existingWorkKey || workPosition,
        currentWorkWeight + value,
      );

      user.categories.forEach((category: RequestOccupationCategoryDto) => {
        const existingKey = this.findExistingCategoryAndOccupation(
          this.userWeighed.categories,
          category.name.trim(),
        );

        const currentWeight = existingKey
          ? this.userWeighed.categories.get(existingKey) || 0
          : 0;

        this.userWeighed.categories.set(
          existingKey || category,
          currentWeight + value,
        );
      });

      user.occupations.forEach((occupation: RequestOccupationDto) => {
        const existingKey = this.findExistingCategoryAndOccupation(
          this.userWeighed.occupations,
          occupation.name.trim(),
        );

        const currentWeight = existingKey
          ? this.userWeighed.occupations.get(existingKey) || 0
          : 0;

        this.userWeighed.occupations.set(
          existingKey || occupation,
          currentWeight + value,
        );
      });
    });
  }

  private findExistingCategoryAndOccupation(
    map: Map<RequestOccupationCategoryDto | RequestOccupationDto, number>,
    name: string,
  ) {
    for (const [key] of map) {
      if (key.name === name) {
        return key;
      }
    }
    return null;
  }

  private findExistingEducation(
    map: Map<RequestEducationDto, number>,
    degree: string,
    institution: string,
    area: string,
  ) {
    for (const [key] of map) {
      if (
        key.degree === degree &&
        key.institution === institution &&
        key.area === area
      ) {
        return key;
      }
    }
    return null;
  }

  private findExistingWork(
    map: Map<RequestWorkDto, number>,
    position: string,
    organization: string,
  ) {
    for (const [key] of map) {
      if (key.position === position && key.organization === organization) {
        return key;
      }
    }
    return null;
  }

  private filterMap<T>(map: Map<T, number>, threshold: number): Map<T, number> {
    return new Map([...map].filter(([, value]) => value > threshold));
  }

  private getMaxElement<T>(map: Map<T, number>): Map<T, number> {
    const max = Math.max(...map.values());
    return new Map([...map].filter(([, value]) => value === max));
  }

  public profilingAlgorithm(
    body: RequestInfoAlgorithmDto,
  ): ResponseProfilerDto {
    this.weighLikedUsers(
      body.likedUsers,
      this.configService.get<number>('algorithm.likeWeight') || 1,
    );
    this.weighLikedUsers(
      body.superLikedUsers,
      this.configService.get<number>('algorithm.superlikeWeight') || 10,
    );
    this.weighLikedUsers(
      body.dislikedUsers,
      this.configService.get<number>('algorithm.dislikeWeight') || -1,
    );
    const filteredUserWeighed = {
      languages: this.filterMap(
        this.userWeighed.languages,
        this.configService.get<number>('algorithm.minLimit') || 5,
      ),
      education: this.getMaxElement(this.userWeighed.education),
      work: this.getMaxElement(this.userWeighed.work),
      categories: this.filterMap(
        this.userWeighed.categories,
        this.configService.get<number>('algorithm.minLimit') || 5,
      ),
      occupations: this.filterMap(
        this.userWeighed.occupations,
        this.configService.get<number>('algorithm.minLimit') || 5,
      ),
    };
    return this.profilerMapper.toResponse(filteredUserWeighed);
  }
}
