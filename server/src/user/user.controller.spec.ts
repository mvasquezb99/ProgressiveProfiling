import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ResponseUserDto } from './dto/response-user.dto';
import { RequestInfoAlgorithmDto } from './dto/request-info-algorithm.dto';
import { ResponseProfilerDto } from 'src/profiler/dto/response-profiler.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const mockUserService = {
      findAll: jest.fn().mockResolvedValue([] as ResponseUserDto[]),
      findByCategory: jest.fn().mockResolvedValue([] as ResponseUserDto[]),
      generateProfile: jest.fn().mockReturnValue({} as ResponseProfilerDto),
      findAllRegular: jest.fn().mockResolvedValue([] as ResponseUserDto[]),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: ResponseUserDto[] = [];
      jest.spyOn(userService, 'findAll').mockResolvedValue(result);

      await expect(userController.findAll()).resolves.toEqual(result);
    });
  });

  describe('findByCategory', () => {
    it('should return an array if users by a category', async () => {
      const result: ResponseUserDto[] = [];
      jest.spyOn(userService, 'findByCategory').mockResolvedValue(result);
      await expect(
        userController.findAllByCategory('category'),
      ).resolves.toEqual(result);
    });
  });

  describe('generateProfile', () => {
    it('should return a profile', () => {
      const dto = new RequestInfoAlgorithmDto();
      const result: ResponseProfilerDto = new ResponseProfilerDto();
      jest.spyOn(userService, 'generateProfile').mockReturnValue(result);
      expect(userController.generateProfile(dto)).toEqual(result);
    });
  });

  describe('findAllRegular', () => {
    it('should return an array of users', async () => {
      const result: ResponseUserDto[] = [];
      jest.spyOn(userService, 'findAllRegular').mockResolvedValue(result);
      await expect(userController.findAllRegular()).resolves.toEqual(result);
    });
  });
});
