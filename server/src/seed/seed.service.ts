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
  ) { }

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
      'professions_filtered.csv',
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
            .then(() => console.log('Database seeding completed.'))
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

    //--------Relate Ciencias e Investigación-------------

    const cienceNode = await this.occupationCategoryClass.categoryModel.findOne(
      {
        where: {
          name: 'Ciencias e Investigación',
        },
      },
    );

    if (!cienceNode) {
      return;
    }

    //With Tecnología de la Información
    await cienceNode.relateTo({
      alias: 'Similar',
      where: { name: 'Tecnología de la Información' },
      properties: { Weight: 1 },
    });

    //With Transporte y Logística

    await cienceNode.relateTo({
      alias: 'Similar',
      where: { name: 'Transporte y Logística' },
      properties: { Weight: 9 },
    });

    //With Manufactura y Producción

    await cienceNode.relateTo({
      alias: 'Similar',
      where: { name: 'Manufactura y Producción' },
      properties: { Weight: 9 },
    });

    //--------Relate Tecnología de la Información-------------

    const tecnologiaNode =
      await this.occupationCategoryClass.categoryModel.findOne({
        where: {
          name: 'Tecnología de la Información',
        },
      });

    if (!tecnologiaNode) {
      return;
    }

    //With Ciencias e Investigación
    await tecnologiaNode.relateTo({
      alias: 'Similar',
      where: { name: 'Ciencias e Investigación' },
      properties: { Weight: 1 },
    });

    //With Transporte y Logística

    await tecnologiaNode.relateTo({
      alias: 'Similar',
      where: { name: 'Transporte y Logística' },
      properties: { Weight: 9 },
    });

    //With Manufactura y Producción

    await tecnologiaNode.relateTo({
      alias: 'Similar',
      where: { name: 'Manufactura y Producción' },
      properties: { Weight: 9 },
    });

    //--------Relate Transporte y Logística-------------

    const transporteNode =
      await this.occupationCategoryClass.categoryModel.findOne({
        where: {
          name: 'Transporte y Logística',
        },
      });

    if (!transporteNode) {
      return;
    }

    //With Manufactura y Producción

    await transporteNode.relateTo({
      alias: 'Similar',
      where: { name: 'Manufactura y Producción' },
      properties: { Weight: 1 },
    });

    //With Tecnología de la Información
    await transporteNode.relateTo({
      alias: 'Similar',
      where: { name: 'Tecnología de la Información' },
      properties: { Weight: 9 },
    });

    //With Ciencias e Investigación
    await transporteNode.relateTo({
      alias: 'Similar',
      where: { name: 'Ciencias e Investigación' },
      properties: { Weight: 9 },
    });

    //--------Relate Manufactura y Producción-------------

    const manufacturaNode =
      await this.occupationCategoryClass.categoryModel.findOne({
        where: {
          name: 'Manufactura y Producción',
        },
      });

    if (!manufacturaNode) {
      return;
    }

    //With Transporte y Logística
    await manufacturaNode.relateTo({
      alias: 'Similar',
      where: { name: 'Transporte y Logística' },
      properties: { Weight: 1 },
    });

    //With Tecnología de la Información
    await manufacturaNode.relateTo({
      alias: 'Similar',
      where: { name: 'Tecnología de la Información' },
      properties: { Weight: 9 },
    });

    //With Ciencias e Investigación
    await manufacturaNode.relateTo({
      alias: 'Similar',
      where: { name: 'Ciencias e Investigación' },
      properties: { Weight: 9 },
    });
  }

  async populateUsers() {
    const categoriesSkillsMap: Record<string, string[]> = {
      'Transporte y Logística': [
        'Conducción',
        'Gestión de flotas',
        'Logística',
        'Mantenimiento de vehículos',
      ],
      'Tecnología de la Información': [
        'Desarrollo web',
        'Bases de datos',
        'Ciberseguridad',
        'Administración de sistemas',
      ],
      'Manufactura y Producción': [
        'Automatización',
        'Control de calidad',
        'Mantenimiento industrial',
        'Producción en línea',
      ],
      'Ciencias e Investigación': [
        'Metodología científica',
        'Escritura académica',
        'Experimentación',
        'Análisis de resultados',
      ],
    };

    const allSkills = Object.values(categoriesSkillsMap).flat();

    faker.seed(123);
    const users = Array.from({ length: 50 }, () => ({
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
        .arrayElements(
          ['Inglés', 'Español', 'Francés', 'Portugués', 'Alemán'],
          {
            min: 1,
            max: 3,
          },
        )
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
    let relationCategory = '';

    for (const userNode of usersNodes) {
      const userSkills = userNode.skills.split(', ');
      const randomUserSkill =
        userSkills[Math.floor(Math.random() * relationCategory.length)];

      for (const categorySkill of Object.keys(categoriesSkillsMap)) {
        if (categoriesSkillsMap[categorySkill].includes(randomUserSkill)) {
          relationCategory = categorySkill;
        }
      }

      const category = await this.occupationCategoryClass.categoryModel.findOne(
        {
          where: { name: relationCategory },
        },
      );

      if (!category) {
        return;
      }

      const relationships = await userNode.findRelationships({
        alias: 'LikesCategory',
        where: {
          relationship: {},
          target: { name: relationCategory },
        },
      });

      if (relationships.length === 0) {
        await userNode.relateTo({
          alias: 'LikesCategory',
          where: { name: relationCategory },
        });
      }

      //Relate user with occupation from the specific category
      const categoryRelatedOccupations = await category.findRelationships({
        alias: 'Has',
      });

      const categoryRelatedOccupationsMap = categoryRelatedOccupations.map(
        (item) => item.target.dataValues.name,
      );

      for (let i = 0; i < 3; i++) {
        const selectedOccupation =
          categoryRelatedOccupationsMap[
          Math.floor(Math.random() * categoryRelatedOccupationsMap.length)
          ];
        await userNode.relateTo({
          alias: 'LikesOccupation',
          where: { name: selectedOccupation },
        });
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
