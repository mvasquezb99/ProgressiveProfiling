import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { UserController } from 'src/user/user.controller';
import { UserService } from 'src/user/user.service';
import { Neo4jContainer, StartedNeo4jContainer } from '@testcontainers/neo4j';
import { setupDBEnv } from './utils/setupDBEnv';

jest.setTimeout(20000);

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let module: TestingModule;
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
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await module.close();
    await neo4jContainer.stop();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result: ResponseUserDto[] = []; // TODO: Add test data here and in db
      jest.spyOn(userService, 'findAll').mockResolvedValue(result);

      const response = await userController.findAll();
      expect(response).toBe(result);
      // expect(response.length).toBeGreaterThan(0); // FIX: Add test data
    });
  });
});
