import { Injectable } from '@nestjs/common';
import { UserClass, UserPropertiesI } from './user.model';
import { ResponseUserDto } from './dto/response-user.dto';
import { QueryNode, queryRelationships, queryUsers } from 'src/scripts/queries';
@Injectable()
export class UserService {
  constructor(private readonly userClass: UserClass) {}

  async findAll(): Promise<ResponseUserDto[]> {
    const dtoData: Record<string, QueryNode[]> = {};
    const users = await this.userClass.userModel.findMany();

    await Promise.all(
      users.map(async (user) => {
        const relationsNodes = await queryRelationships(user.name);
        dtoData[user.name] = relationsNodes.records.map(
          (r) => r.get('n') as QueryNode,
        );
      }),
    );

    return users.map((user) => ResponseUserDto.apply(user, dtoData[user.name]));
  }

  async findByCategory(category: string): Promise<ResponseUserDto[]> {
    const dtoData: Record<string, QueryNode[]> = {};

    const userNodes = await queryUsers(category);
    const users = userNodes.records.map((r) => r.get('u') as QueryNode);
    const usersProp = users.map((u) => u.properties as UserPropertiesI);
    await Promise.all(
      usersProp.map(async (user) => {
        const relationsNodes = await queryRelationships(user.name);
        dtoData[user.name] = relationsNodes.records.map(
          (r) => r.get('n') as QueryNode,
        );
      }),
    );

    return usersProp.map((user) =>
      ResponseUserDto.apply(user, dtoData[user.name]),
    );
  }
}
