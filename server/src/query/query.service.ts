import { Injectable } from '@nestjs/common';
import { QueryBuilder } from 'neogma';
import { QueryResult } from 'neo4j-driver';
import { ConfigService } from '@nestjs/config';

export type QueryNode = {
  labels: string[];
  properties: Record<string, unknown>;
};

@Injectable()
export class QueryService {
  constructor(private readonly configService: ConfigService) {}

  public queryRelationships(userName: string): Promise<QueryResult> {
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
  }

  public queryUsersWithCategoryAndSimilar(
    category: string,
    similarWeight: number = this.configService.get<number>(
      'query.similar.minWeight',
    ) || 5,
    limit: number = this.configService.get<number>('query.users.limit') || 15,
  ): Promise<QueryResult> {
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
      .limit(limit)
      .run();
  }
}
