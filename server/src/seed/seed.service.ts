import { Neogma } from 'neogma';
import * as fs from 'fs';
import * as path from 'path';
import { CastingContext, parse } from 'csv-parse';
import { Inject, Injectable } from '@nestjs/common';
import { OccupationClass } from 'src/occupation/occupation.model';
import { OccupationCategoryClass } from 'src/occupation-category/occupation-category.model';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';
import { Type, UserClass } from '../user/user.model';
import { EducationClass } from 'src/user/user-education.model';
import { LocationClass } from 'src/user/user-location.model';
import { WorkClass } from 'src/user/user-work.model';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
interface ExtendedCastingContext extends CastingContext {
  column: string;
}

@Injectable()
export class SeedDataService {
  constructor(
    @Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma,
    @Inject(OccupationClass) private readonly occupationClass: OccupationClass,
    @Inject(OccupationCategoryClass)
    private readonly occupationCategoryClass: OccupationCategoryClass,
    @Inject(UserClass) private readonly userClass: UserClass,
    @Inject(LocationClass) private readonly locationClass: LocationClass,
    @Inject(EducationClass) private readonly educationClass: EducationClass,
    @Inject(WorkClass) private readonly workClass: WorkClass,
  ) {}

  /**
   * Seeds the database with initial user data.
   * @param neogma - Neogma instance for database interaction.
   */
  async seedData() {
    await this.neogma.queryRunner.run('MATCH (n) DETACH DELETE n'); // Clear the database

    const categoriesOccupationsMap: Record<string, string[]> = {}; // create a dict

    const csvFilePath = path.join(
      __dirname,
      '..',
      'assets',
      'professions_with_category.csv',
    );

    const headers = ['Profession', 'Category'];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    let profession: string = '';
    let category: string = '';

    parse(
      fileContent,
      {
        delimiter: ',',
        columns: headers,
        fromLine: 2,
        cast: (columnValue: string, context: ExtendedCastingContext) => {
          const trimmedValue = columnValue.trim();
          if (context.column.trim() === 'Profession') {
            profession = trimmedValue;
          }

          if (context.column.trim() === 'Category') {
            category = trimmedValue;
            if (!(category in categoriesOccupationsMap)) {
              categoriesOccupationsMap[category] = [];
            }
            if (!categoriesOccupationsMap[category].includes(profession)) {
              categoriesOccupationsMap[category].push(profession);
            }
          }
        },
      },
      (error) => {
        if (error) {
          console.error(error);
        } else {
          console.log('Database seeding started...');
          this.populateOccupations(categoriesOccupationsMap)
            .then(() => {
              console.log('Occupations seeded successfully.');
              this.populateUsers()
                .then(() => console.log('User seeded successfully.'))
                .catch(console.error);
            })
            .catch(console.error);
        }
      },
    );
  }

  async populateOccupations(
    categoriesOccupationsMap: Record<string, string[]>,
  ) {
    await this.occupationCategoryClass.categoryModel.createMany(
      Object.keys(categoriesOccupationsMap).map((categoryName) => ({
        name: categoryName,
      })),
    );

    await this.occupationClass.occupationModel.createMany(
      Object.values(categoriesOccupationsMap)
        .flat()
        .map((profession) => ({ name: profession })),
    );

    const relationshipPromises = Object.entries(
      categoriesOccupationsMap,
    ).flatMap(([categoryName, professions]) =>
      professions.map(async (profession) => {
        const categoryNode =
          await this.occupationCategoryClass.categoryModel.findOne({
            where: { name: categoryName },
          });

        if (categoryNode) {
          await categoryNode.relateTo({
            alias: 'Has',
            where: { name: profession.trim() },
          });
        }
      }),
    );

    await Promise.all(relationshipPromises);
  }

  async populateUsers() {
    const categoriesSkillsMap: Record<string, string[]> = {
      'Transporte y Logística': [
        'Conducción',
        'Gestión de flotas',
        'Logística',
        'Mantenimiento de vehículos',
      ],
      'Construcción e Infraestructura': [
        'Carpintería',
        'Electricidad',
        'Albañilería',
        'Dibujo técnico',
      ],
      'Seguridad y Defensa': [
        'Vigilancia',
        'Protección personal',
        'Control de accesos',
        'Investigación',
      ],
      'Fuerzas Armadas': [
        'Estrategia militar',
        'Entrenamiento físico',
        'Manejo de armas',
        'Operaciones tácticas',
      ],
      'Comunicación y Marketing': [
        'Redacción',
        'SEO',
        'Marketing digital',
        'Gestión de redes sociales',
      ],
      'Turismo y Hostelería': [
        'Atención al cliente',
        'Gestión hotelera',
        'Gastronomía',
        'Guía turístico',
      ],
      'Arte, Cultura y Entretenimiento': [
        'Dibujo',
        'Música',
        'Actuación',
        'Diseño gráfico',
      ],
      'Administración Pública y Gobierno': [
        'Legislación',
        'Políticas públicas',
        'Gestión de proyectos',
        'Negociación',
      ],
      'Finanzas, Contabilidad y Negocios': [
        'Contabilidad',
        'Análisis financiero',
        'Gestión de riesgos',
        'Inversiones',
      ],
      'Tecnología de la Información': [
        'Desarrollo web',
        'Bases de datos',
        'Ciberseguridad',
        'Administración de sistemas',
      ],
      'Educación y Formación': [
        'Pedagogía',
        'Didáctica',
        'Planificación educativa',
        'Psicología educativa',
      ],
      'Salud y Medicina': [
        'Medicina general',
        'Enfermería',
        'Farmacología',
        'Terapia física',
      ],
      'Energía y Minería': [
        'Ingeniería petrolera',
        'Energía renovable',
        'Minería',
        'Geología',
      ],
      'Manufactura y Producción': [
        'Automatización',
        'Control de calidad',
        'Mantenimiento industrial',
        'Producción en línea',
      ],
      Otros: [
        'Habilidades blandas',
        'Trabajo en equipo',
        'Creatividad',
        'Resolución de problemas',
      ],
      'Agricultura y Desarrollo Rural': [
        'Agrotecnología',
        'Irrigación',
        'Cultivo',
        'Ganadería',
      ],
      'Matemáticas y Estadística': [
        'Cálculo',
        'Probabilidad',
        'Análisis de datos',
        'Modelado matemático',
      ],
      'Ciencias Naturales y Medio Ambiente': [
        'Biología',
        'Ecología',
        'Gestión ambiental',
        'Cambio climático',
      ],
      'Ciencias e Investigación': [
        'Metodología científica',
        'Escritura académica',
        'Experimentación',
        'Análisis de resultados',
      ],
      'Gerencia y Administración de Propiedades': [
        'Gestión inmobiliaria',
        'Administración de edificios',
        'Tasación',
        'Mantenimiento',
      ],
      'Atención al Cliente y Ventas': [
        'Negociación',
        'Empatía',
        'Resolución de conflictos',
        'Técnicas de venta',
      ],
      'Liderazgo y Organizaciones Sociales': [
        'Gestión de equipos',
        'Mediación',
        'Planificación estratégica',
        'Empoderamiento comunitario',
      ],
    };

    const allSkills = Object.values(categoriesSkillsMap).flat();

    faker.seed(123);
    const users = Array.from({ length: 20 }, () => ({
      type: Type.SAMPLE,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.image.personPortrait(),
      birthdate: faker.date.birthdate().toISOString(),
      skills: faker.helpers
        .arrayElements(allSkills, {
          min: 1,
          max: 4,
        })
        .join(', '),
      languages: faker.helpers
        .arrayElements(['English', 'Español', 'French'], {
          min: 1,
          max: 3,
        })
        .join(', '),
    }));

    const locations = Array.from({ length: 10 }, () => ({
      postalCode: faker.location.zipCode(),
      city: faker.location.city(),
      country: faker.location.country(),
      region: faker.location.county(),
      uuid: uuidv4(),
    }));

    const education = Array.from({ length: 20 }, () => ({
      degree: faker.helpers.arrayElement([
        'Inicial',
        'Media',
        'Preescolar',
        'Basica',
        'Superior',
      ]),
      area: faker.helpers.arrayElement([
        'Ciencias de la Computación',
        'Matemáticas',
        'Física',
        'Biología',
      ]),
      institution: faker.company.name(),
      uuid: uuidv4(),
    }));

    const work = Array.from({ length: 20 }, () => ({
      position: faker.person.jobTitle(),
      organization: faker.company.name(),
      uuid: uuidv4(),
    }));

    await this.userClass.userModel.createMany(users);
    await this.locationClass.locationModel.createMany(locations);
    await this.educationClass.educationModel.createMany(education);
    await this.workClass.workModel.createMany(work);

    //relate users with categories
    const usersNodes = await this.userClass.userModel.findMany();
    const locationsNodes = await this.locationClass.locationModel.findMany();
    const educationsNodes = await this.educationClass.educationModel.findMany();
    const worksNodes = await this.workClass.workModel.findMany();
    let relationOccupation = '';

    for (const userNode of usersNodes) {
      const userSkills = userNode.skills.split(', ');

      for (const userSkill of userSkills) {
        for (const occupationSkill of Object.keys(categoriesSkillsMap)) {
          if (categoriesSkillsMap[occupationSkill].includes(userSkill)) {
            relationOccupation = occupationSkill;
          }
        }

        const category =
          await this.occupationCategoryClass.categoryModel.findOne({
            where: { name: relationOccupation },
          });

        if (!category) {
          continue;
        }

        const relationships = await userNode.findRelationships({
          alias: 'LikesCategory',
          where: {
            relationship: {},
            target: { name: relationOccupation },
          },
        });

        if (relationships.length === 0) {
          await userNode.relateTo({
            alias: 'LikesCategory',
            where: { name: relationOccupation },
          });
        }
      }

      const randomEducation =
        educationsNodes[Math.floor(Math.random() * educationsNodes.length)];
      const randomLocation =
        locationsNodes[Math.floor(Math.random() * locationsNodes.length)];
      const randomWork =
        worksNodes[Math.floor(Math.random() * worksNodes.length)];

      await userNode.relateTo({
        alias: 'HasLocation',
        where: { uuid: randomLocation.uuid },
      });

      await userNode.relateTo({
        alias: 'HasEducation',
        where: { uuid: randomEducation.uuid },
      });

      await userNode.relateTo({
        alias: 'WorkExperience',
        where: { uuid: randomWork.uuid },
      });
      console.log('----------------------------------------');
    }
  }
}
