import { StartedNeo4jContainer } from '@testcontainers/neo4j';

export const setupDBEnv = (neo4jContainer: StartedNeo4jContainer) => {
  process.env.DATABASE_URI = neo4jContainer.getBoltUri();
  process.env.DATABASE_USERNAME = neo4jContainer.getUsername();
  process.env.DATABASE_PASSWORD = neo4jContainer.getPassword();
};
