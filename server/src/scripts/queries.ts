import { QueryBuilder } from 'neogma';
import { QueryResult } from 'neo4j-driver';

export type QueryNode = {
  labels: string[];
  properties: Record<string, unknown>;
};

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


export const queryUsersWithCategoryAndSimilar = (
  category: string,
  similarWeight: number = 5,
): Promise<QueryResult> => {
  return new QueryBuilder()
    .match({
      related: [
        {
          identifier: 'c',
          label: 'Category',
          where: { name: category },
        },
        {
          identifier: 's',
          direction: 'out',
          name: 'Similar',
        },
        {
          identifier: 'c2',
          label: 'Category',
        },
      ],
    })
    .where('s.weight < ' + similarWeight)
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
          identifier: 'c3',
          label: 'Category',
        },
      ],
    })
    .where('c3.name = c.name OR c3.name = c2.name')
    .return('DISTINCT u')
    .limit(10)
    .run();
};
