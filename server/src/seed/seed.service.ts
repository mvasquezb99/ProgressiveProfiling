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
    const professions: { name: string }[] = [];
    const categories: { name: string }[] = [];

    const csvFilePath = path.join(
      __dirname,
      'assets',
      'professions_with_category.csv',
    );

    const headers = ['Profession', 'Category'];

    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    parse(
      fileContent,
      {
        delimiter: ',',
        columns: headers,
        fromLine: 2,
        cast: (columnValue: string, context: ExtendedCastingContext) => {
          const trimmedValue = columnValue.trim();
          if (context.column.trim() === 'Profession') {
            if (!professions.some((p) => p.name === trimmedValue)) {
              professions.push({ name: trimmedValue });
            }
          }

          if (context.column.trim() === 'Category') {
            if (!categories.some((c) => c.name === trimmedValue)) {
              categories.push({ name: trimmedValue });
            }
          }
        },
      },
      async (error) => {
        if (error) {
          console.error(error);
        } else {
          await this.populateDatabase(professions, categories);
          console.log('Database seeded successfully.');
        }
      },
    );
  }

  async populateDatabase(
    professions: { name: string }[],
    categories: { name: string }[],
  ) {
    await this.occupationClass.occupationModel.createMany(professions);
    await this.occupationCategoryClass.categoryModel.createMany(categories);
  }
}
