import { Neogma } from 'neogma';

/**
 * Seeds the database with initial user data.
 * @param neogma - Neogma instance for database interaction.
 */
export const seedData = async (neogma: Neogma) => {
  await neogma.queryRunner.run('MATCH (n) DETACH DELETE n'); // Clear the database
};
