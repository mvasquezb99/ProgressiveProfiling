import { ConfigService } from '@nestjs/config';
import { NeogmaModuleOptions } from './neogma-config.interface';

/**
 * Creates the database connection configuration.
 * @param configService - NestJS ConfigService for environment variables.
 * @param customConfig - Optional custom database configuration.
 * @returns NeogmaModuleOptions with database credentials.
 */
export const createDatabaseConnection = (
  configService: ConfigService,
  customConfig?: NeogmaModuleOptions,
) =>
  customConfig || {
    uri: configService.get<string>('DATABASE_URI'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
  };

/**
 * Custom error class for handling database connection errors.
 */
export class ConnectionError extends Error {
  public details: string;
  constructor(oldError: Error) {
    super();
    this.message = `Error connecting to the database`;
    this.name = 'ConnectionError';
    this.stack = oldError.stack;
    this.details = oldError.message;
  }
}
