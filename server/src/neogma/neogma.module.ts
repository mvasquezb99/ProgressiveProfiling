import { Global, Module } from '@nestjs/common';
import { Neogma } from 'neogma';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConnectionError, createDatabaseConnection } from './neogma.utils';
import {
  NEOGMA_CONFIG,
  NEOGMA_CONNECTION,
  NeogmaModuleOptions,
} from './neogma-config.interface';

@Global()
@Module({})
export class NeogmaModule {
  static forRoot(customConfig?: NeogmaModuleOptions) {
    return {
      module: NeogmaModule,
      imports: [ConfigModule],
      global: true,
      providers: [
        {
          provide: NEOGMA_CONFIG,
          inject: [ConfigService],
          useFactory: (configService: ConfigService) =>
            createDatabaseConnection(configService, customConfig),
        },
        {
          provide: NEOGMA_CONNECTION,
          inject: [NEOGMA_CONFIG],
          useFactory: async (config: NeogmaModuleOptions) => {
            try {
              const neogma = new Neogma(
                {
                  url: config.uri,
                  username: config.username,
                  password: config.password,
                },
                {
                  logger: console.log,
                },
              );
              await neogma.verifyConnectivity();
              console.log('Connected to Neo4j');
              return neogma;
            } catch (error) {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              throw new ConnectionError(error);
            }
          },
        },
      ],
      exports: [NEOGMA_CONNECTION],
    };
  }
}
