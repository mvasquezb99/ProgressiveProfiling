import { Test, TestingModule } from '@nestjs/testing';
import { ProfilerService } from './profiler.service';
import { ConfigService } from '@nestjs/config';
import { ProfilerMapper } from './mapper/profiler.mapper';
import { RequestInfoAlgorithmDto } from 'src/user/dto/request-info-algorithm.dto';
import { RequestOccupationCategoryDto } from 'src/occupation-category/dto/request-occupation-category.dto';
import { RequestLocationDto } from 'src/user/dto/request-location.dto';

const listUsers = [
  {
    name: 'Edmond Lubowitz',
    birthdate: '1969-03-31T07:54:19.303Z',
    skills: 'Administración de sistemas, Análisis de resultados, Logística',
    languages: 'French, Español',
    categories: [
      {
        name: 'Ciencias e Investigación',
      },
      {
        name: 'Tecnología de la Información',
      },
      {
        name: 'Transporte y Logística',
      },
    ],
    occupations: [
      {
        name: 'Programadores de aplicaciones',
      },
      {
        name: 'Conductores de motocicletas',
      },
      {
        name: 'Controladores de instalaciones de procesamiento de productos químicos',
      },
    ],
    location: {
      city: 'College Station',
      country: 'Solomon Islands',
      postalCode: '91738',
      region: 'Cumbria',
    },
    education: {
      area: 'Matemáticas',
      degree: 'Superior',
      institution: 'Reynolds - Davis',
    },
    work: {
      organization: 'Hagenes LLC',
      position: 'Corporate Creative Agent',
    },
  },
  {
    name: 'Lewis Hand',
    birthdate: '1971-01-11T15:30:43.874Z',
    skills:
      'Gestión de flotas, Automatización, Administración de sistemas, Análisis de resultados',
    languages: 'Español',
    categories: [
      {
        name: 'Ciencias e Investigación',
      },
      {
        name: 'Manufactura y Producción',
      },
      {
        name: 'Tecnología de la Información',
      },
      {
        name: 'Transporte y Logística',
      },
    ],
    occupations: [
      {
        name: 'Desarrolladores de software',
      },
      {
        name: 'Revisores y cobradores de los transportes públicos',
      },
      {
        name: 'Físicos y astrónomos',
      },
      {
        name: 'Ingenieros industriales y de producción',
      },
    ],
    location: {
      city: 'College Station',
      country: 'Solomon Islands',
      postalCode: '91738',
      region: 'Cumbria',
    },
    education: {
      area: 'Biología',
      degree: 'Inicial',
      institution: 'Lehner, Becker and Jones',
    },
    work: {
      organization: 'Schneider - Streich',
      position: 'Direct Creative Producer',
    },
  },
];

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
      expect(() => profilerService.weighLikedUsers(listUsers, 1)).not.toThrow(); // Liked Users
      expect(() =>
        profilerService.weighLikedUsers(listUsers, -1),
      ).not.toThrow(); // Disliked Users
      expect(() => profilerService.weighLikedUsers(listUsers, 5)).not.toThrow(); // Superliked Users
    });
  });

  describe('profilingAlgorithm', () => {
    it('sohuld return a profile based on a list on users', () => {
      const dto: RequestInfoAlgorithmDto = {
        name: '',
        birthdate: '',
        location: new RequestLocationDto(),
        category: new RequestOccupationCategoryDto(),
        likedUsers: listUsers,
        dislikedUsers: listUsers,
        superLikedUsers: listUsers,
      };
      const result = {
        languages: ['French', 'Español'],
        education: [
          {
            area: 'Matemáticas',
            degree: 'Superior',
            institution: 'Reynolds - Davis',
          },
          {
            area: 'Biología',
            degree: 'Inicial',
            institution: 'Lehner, Becker and Jones',
          },
        ],
        work: [
          {
            organization: 'Hagenes LLC',
            position: 'Corporate Creative Agent',
          },
          {
            organization: 'Schneider - Streich',
            position: 'Direct Creative Producer',
          },
        ],
        categories: [
          {
            name: 'Ciencias e Investigación',
          },
          {
            name: 'Tecnología de la Información',
          },
          {
            name: 'Transporte y Logística',
          },
          {
            name: 'Manufactura y Producción',
          },
        ],
        occupations: [
          {
            name: 'Programadores de aplicaciones',
          },
          {
            name: 'Conductores de motocicletas',
          },
          {
            name: 'Controladores de instalaciones de procesamiento de productos químicos',
          },
          {
            name: 'Desarrolladores de software',
          },
          {
            name: 'Revisores y cobradores de los transportes públicos',
          },
          {
            name: 'Físicos y astrónomos',
          },
          {
            name: 'Ingenieros industriales y de producción',
          },
        ],
      };
      expect(profilerService.profilingAlgorithm(dto)).toEqual(result);
    });
  });
});
