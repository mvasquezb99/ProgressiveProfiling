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
import { faker } from "@faker-js/faker";
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
          // this.populateOccupations(categoriesOccupationsMap)
          //   .then(() => console.log('Occupations seeded successfully.'))
          //   .catch(console.error);
          this.populateUsers()
            .then(() => console.log('User seeded successfully.')).catch(console.error);
        }
      },
    );
  }

  async populateOccupations(categoriesOccupationsMap: Record<string, string[]>) {
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
    faker.seed(123);
    const users = Array.from({ length: 20 }, () => ({
      type: Type.SAMPLE,
      name: faker.internet.username(),
      email: faker.internet.email(),
      image: faker.image.personPortrait(),
      birthdate: faker.date.birthdate().toISOString(),
      skills: faker.helpers.arrayElements(['JavaScript', 'Python', 'Java', 'Node', 'Php'], {min: 1, max: 5}),
      languages: faker.helpers.arrayElements(['English', 'Español', 'French'], {min: 1, max: 5}),
    }));

    const locations = Array.from({ length: 10 }, () => ({
      postalCode: faker.location.zipCode(),
      city: faker.location.city(),
      country: faker.location.country(),
      region: faker.location.county(),
    }));

    const education = Array.from({ length: 20 }, () => ({
      degree: faker.helpers.arrayElement(['Inicial', 'Media', 'Preescolar','Basica', 'Superior']),
      area: faker.helpers.arrayElement(['Computer Science', 'Mathematics', 'Physics', 'Biology']),
      institution: faker.company.name(),
    }));
    const work = Array.from({ length: 20 }, () => ({
      position: faker.person.jobTitle(),
      organization: faker.company.name(),
    }));

    await this.userClass.userModel.createMany(users);
    await this.locationClass.locationModel.createMany(locations);
    await this.educationClass.educationModel.createMany(education);
    await this.workClass.workModel.createMany(work);


  }
}
