import { Neogma } from 'neogma';
import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { OccupationClass } from 'src/occupation/occupation.model';
import { OccupationCategoryClass } from 'src/occupation-category/occupation-category.model';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';


type NodeInfo = {
  occupation: string;
  category: string;
};

@Injectable()
export class seedDataClass{
  constructor(@Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma, @Inject(OccupationClass) private readonly occupationClass: OccupationClass, @Inject(OccupationCategoryClass) private readonly occupationCategoryClass: OccupationCategoryClass) { }
  // constructor(
  //   @Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma,
  //   @Inject(forwardRef(() => OccupationClass)) private readonly occupationClass: OccupationClass,
  //   @Inject(forwardRef(() => OccupationCategoryClass)) private readonly occupationCategoryClass: OccupationCategoryClass
  // ) {}
  
  /**
   * Seeds the database with initial user data.
   * @param neogma - Neogma instance for database interaction.
   */
  async seedData(neogma: Neogma)  {
    await neogma.queryRunner.run('MATCH (n) DETACH DELETE n'); // Clear the database
    const professions: { name: string }[] = [];
    const categories: { name: string }[] = [];

    const csvFilePath = path.resolve(__dirname, '../utils/professions_with_categories.csv');
  
    const headers = ['Profession', 'Category'];
  
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
    
    parse(fileContent, {
      delimiter: ',',
      columns: headers,
      fromLine: 2,
      cast: (columnValue, context) => {
        if (context.column === 'Profession') {
          professions.push({ name: columnValue });
        }
        
        if (context.column === 'Category') {
          categories.push({name: columnValue});
        }
  
        return columnValue;
      }
    }, (error, result: NodeInfo[]) => {
      if (error) {
        console.error(error);
      }        //console.log("Result", result);
    });
    this.occupationClass.occupationModel.createMany(professions)
    this.occupationCategoryClass.categoryModel.createMany(categories)

  };
}



