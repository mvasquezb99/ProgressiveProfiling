import { Test, TestingModule } from '@nestjs/testing';
import { ProfilerService } from './profiler.service';
import { ConfigService } from '@nestjs/config';
import { ProfilerMapper } from './mapper/profiler.mapper';
import { RequestInfoAlgorithmDto } from 'src/user/dto/request-info-algorithm.dto';
import { RequestOccupationCategoryDto } from 'src/occupation-category/dto/request-occupation-category.dto';
import { RequestLocationDto } from 'src/user/dto/request-location.dto';

describe('ProfilerService', () => {
  let profilerService: ProfilerService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [ConfigService, ProfilerService, ProfilerMapper],
    }).compile();
    profilerService = moduleRef.get<ProfilerService>(ProfilerService);
  });

  describe('weighLikedUsers', () => {
    it('should weigh a list of users with a given value', () => {
      const listUsers = []; // TODO: Add some data
      const value = 1;

      expect(() =>
        profilerService.weighLikedUsers(listUsers, value),
      ).not.toThrow();
    });
  });

  describe('profilingAlgorithm', () => {
    it('sohuld return a profile based on a list on users', () => {
      const listUsers: RequestInfoAlgorithmDto = {
        name: '',
        birthdate: '',
        location: new RequestLocationDto(),
        category: new RequestOccupationCategoryDto(),
        likedUsers: [],
        dislikedUsers: [],
        superLikedUsers: [],
      }; // TODO: Add some data
      const result = profilerService.profilingAlgorithm(listUsers);
      expect(result).toBeDefined();
    });
  });
});
