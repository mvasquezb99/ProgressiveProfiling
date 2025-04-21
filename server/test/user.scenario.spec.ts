import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UserController } from 'src/user/user.controller';
import { Neo4jContainer, StartedNeo4jContainer } from '@testcontainers/neo4j';
import { setupDBEnv } from './utils/setupDBEnv';
import { RequestFinalUserDto } from 'src/user/dto/request-final-user.dto';

jest.setTimeout(50000);

const exampleUser: RequestFinalUserDto = {
  name: 'John Doe',
  birthdate: '1990-01-01',
  languages: 'Spanish, English',
  education: {
    degree: 'Bachelor',
    institution: 'MIT',
    area: 'Biology',
  },
  location: {
    postalCode: '89472-3818',
    city: 'San Francisco',
    country: 'United States',
    region: 'California',
  },
  work: {
    organization: 'TechCorp',
    position: 'Software Engineer',
  },
  category: {
    name: 'Ciencias e Investigación',
  },
  occupations: [{ name: 'Operations Manager' }, { name: 'Software Developer' }],
  email: 'JohnDoe@example.com',
};

describe('UserController', () => {
  let userController: UserController;
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
  });

  afterAll(async () => {
    await module.close();
    await neo4jContainer.stop();
  });

  describe('findAll', () => {
    it('should save a user and then return an array of users', async () => {
      await expect(
        userController.saveUser(exampleUser),
      ).resolves.toBeUndefined();
      const result = await userController.findAllRegular();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0]).toEqual(
        expect.objectContaining({
          name: 'John Doe',
          birthdate: '1990-01-01',
          languages: 'Spanish, English',
        }),
      );
    });
  });
});
