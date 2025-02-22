import { Inject, Injectable } from '@nestjs/common';
import { UserClass } from './user.model';
import { ResponseUserDto } from './dto/response-user.dto';
import { Neogma } from 'neogma';
import { NEOGMA_CONNECTION } from 'src/neogma/neogma-config.interface';
import { QueryBuilder } from 'neogma';
import { queryRelationships, queryUsers } from 'src/scripts/queries';
@Injectable()
export class UserService {
  constructor(
    private readonly userClass: UserClass,
    @Inject(NEOGMA_CONNECTION) private readonly neogma: Neogma,
  ) { }

  async findAll(): Promise<ResponseUserDto[]> {
    const users = await this.userClass.userModel.findMany();

    return users.map((user) => ResponseUserDto.apply(user));
  }

  async findByCategory(category: string): Promise<ResponseUserDto[]> {
    
    let dtoData: Record<string,Node[]> = {}
    
    const userNodes = queryUsers(category, this.neogma);
    const users = (await userNodes).records.map((r) => r.get('u'));

    await Promise.all(
      users.map(async (user) => {
        let relationsNodes = queryRelationships(user.properties.name, this.neogma);
        dtoData[user.properties.name] = (await relationsNodes).records.map((r) => r.get('n'));
      })
    )
    
    return users.map((user) => ResponseUserDto.apply(user.properties, dtoData[user.properties.name]));
  }


}
