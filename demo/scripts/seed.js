import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import dbConnect from '../src/lib/mongoose.js';
import JobOffer from '../src/models/JobOffer.js';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import { fakerES_MX as faker } from '@faker-js/faker';

dotenv.config();

async function seed() {
  await dbConnect();

  const filePath = path.join(process.cwd(), 'scripts', 'professions_filtered.csv');
  if (!filePath) {
    console.error('❌ No file found', err);
    process.exit(1);
  }

  await JobOffer.deleteMany();

  const jobOffers = [];
  faker.locale = 'es';

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const { Profession, Category } = row;
        if (Profession && Category) {
          const randomName = faker.person.jobTitle();
          jobOffers.push({
            _id: new ObjectId(),
            name: randomName,
            description: `Description for profession ${Profession}`,
            category: Category,
            occupations: [Profession],
            publicationDate: `${Math.floor(Math.random() * (100 - 1) + 1).toString()} ${
              Math.random() < 0.5 ? 'horas' : 'días'
            }`,
            experience: Math.floor(Math.random() * (5 - 0) + 0).toString() + ' años de experiencia',
            duration: `${Math.floor(Math.random() * (7 - 1) + 1).toString()} ${
              Math.random() < 0.5 ? 'meses' : 'años'
            }`,
            salary: (Math.random() * (10000000 - 1400000) + 1400000).toString(),
            location: faker.location.city(),
            extra: faker.lorem.paragraph(1),
            benefits: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
          });
        }
      })
      .on('end', resolve)
      .on('error', reject);
  });

  if (jobOffers.length > 0) {
    await JobOffer.insertMany(jobOffers);
    console.log(`✅ Inserted ${jobOffers.length} job offers`);
  } else {
    console.log('⚠️ No job offers found to insert');
  }

  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed', err);
  process.exit(1);
});
