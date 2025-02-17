import { Neogma } from 'neogma';
import * as fs from 'fs';
import * as path from 'path';
import { CastingContext, parse } from 'csv-parse';
import { Inject, Injectable } from '@nestjs/common';
import { OccupationClass } from 'src/occupation/occupation.model';
import { OccupationCategoryClass } from 'src/occupation-category/occupation-category.model';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';

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
          this.populateDatabase(categoriesOccupationsMap)
            .then(() => console.log('Database seeded successfully.'))
            .catch(console.error);
        }
      },
    );
  }

  async populateDatabase(categoriesOccupationsMap: Record<string, string[]>) {
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
}
