import { QueryBuilder } from 'neogma';
import { QueryResult } from 'neo4j-driver';

export type QueryNode = {
  labels: string[];
  properties: Record<string, unknown>;
};

/**
 *
 * @param userName
 */
export const queryRelationships = (userName: string): Promise<QueryResult> => {
  return new QueryBuilder()
    .match({
      related: [
        {
          identifier: 'u',
          label: 'User',
          where: { name: userName },
        },
        {
          identifier: 'r',
          direction: 'out',
        },
        {
          identifier: 'n',
        },
      ],
    })
    .return('n')
    .run();
};

/**
 *
 * @param category
 */
export const queryUsers = (category: string): Promise<QueryResult> => {
  return new QueryBuilder()
    .match({
      related: [
        {
          identifier: 'u',
          label: 'User',
        },
        {
          identifier: 'r',
          direction: 'out',
          name: 'LikesCategory',
        },
        {
          identifier: 'c',
          label: 'Category',
          where: { name: category },
        },
      ],
    })
    .return('u')
    .run();
};
