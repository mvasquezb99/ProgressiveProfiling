import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { ResponseProfilerDto } from 'src/profiler/dto/response-profiler.dto';
import { StartedNeo4jContainer, Neo4jContainer } from '@testcontainers/neo4j';
import { setupDBEnv } from './utils/setupDBEnv';
import { NeogmaModule } from 'src/neogma/neogma.module';
import { RequestInfoAlgorithmDto } from 'src/user/dto/request-info-algorithm.dto';
import { RequestFinalUserDto } from 'src/user/dto/request-final-user.dto';
import { RequestOccupationCategoryDto } from 'src/occupation-category/dto/request-occupation-category.dto';
import { RequestLocationDto } from 'src/user/dto/request-location.dto';

jest.setTimeout(20000);

describe('User', () => {
  let app: INestApplication<App>;
  let userService: UserService;
  let neo4jContainer: StartedNeo4jContainer;

  beforeAll(async () => {
    try {
      console.log('Starting Neo4j Testcontainer...');
      neo4jContainer = await new Neo4jContainer().start();
      console.log('Neo4j container started:', neo4jContainer.getHost());

      setupDBEnv(neo4jContainer);
    } catch (error) {
      console.log(error);
    }
  });

  beforeEach(async () => {
    const mockUserService = {
      findAll: jest.fn().mockResolvedValue([] as ResponseUserDto[]),
      findByCategory: jest.fn().mockResolvedValue([] as ResponseUserDto[]),
      generateProfile: jest.fn().mockReturnValue({} as ResponseProfilerDto),
      findAllRegular: jest.fn().mockResolvedValue([] as ResponseUserDto[]),
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule, NeogmaModule.forRoot()],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    app = moduleFixture.createNestApplication();
    userService = moduleFixture.get<UserService>(UserService);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await neo4jContainer.stop();
  });

  it('/users (GET))', async () => {
    const result = await userService.findAll();
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(result);
  });

  it('/users/regular (GET))', async () => {
    const result = await userService.findAllRegular();
    return request(app.getHttpServer())
      .get('/users/regular')
      .expect(200)
      .expect(result);
  });

  it('/users/categories (GET))', async () => {
    const result = await userService.findByCategory('category');
    return request(app.getHttpServer())
      .get('/users/categories')
      .expect(200)
      .expect(result);
  });

  // TODO: Add body data
  it('/users/generate (POST))', () => {
    // const requestBody = new RequestInfoAlgorithmDto();
    // const result = userService.generateProfile(requestBody);
    return request(app.getHttpServer()).post('/users/generate').expect(400); // FIX:
  });

  // TODO: Add body data
  it('/users/save (POST))', () => {
    // const requestBody = new RequestFinalUserDto();
    // const result = userService.saveUser(requestBody);
    return request(app.getHttpServer()).post('/users/save').expect(400); // FIX:
  });
});
