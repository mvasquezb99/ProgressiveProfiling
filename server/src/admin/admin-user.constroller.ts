import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { AdminUserService } from './admin-user.service';
import {
  RequestFinalUserArrayDto,
  RequestFinalUserDto,
} from 'src/user/dto/request-final-user.dto';
import { UpdateRelationshipsDto } from './dto/request-update-relationships.dto';

@ApiTags('admin/users')
@Controller('admin/users')
export class AdminUserController {
  // TODO:
  // 1. Create users from a JSON with a list of users with all info DONE
  // 2. Create a single user from a JSON with all the info DONE
  // 3. Relate a existing user with a relationship
  // 4. Delete a existing user without relationships
  // 5. Update a existing user

  public constructor(private readonly adminUserService: AdminUserService) { }

  @Post()
  @ApiOperation({
    summary: 'Create users from a JSON with a list of users with all info',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users created',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async saveUsers(@Body() body: RequestFinalUserArrayDto) {
    await this.adminUserService.saveUsers(body);
  }

  @Post('single')
  @ApiOperation({
    summary: 'Create a single user from a JSON with all the info',
  })
  @ApiResponse({
    status: 200,
    description: 'User created',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async saveUser(@Body() body: RequestFinalUserDto) {
    await this.adminUserService.saveUser(body);
  }

  @Post('relate')
  @ApiOperation({
    summary: 'Relate an existing user with a relationship from a JSON',
  })
  @ApiResponse({
    status: 200,
    description: 'User related with some relationship',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async relateUser(
    @Query('name') name: string,
    @Body() body: UpdateRelationshipsDto,
  ) {
    await this.adminUserService.relateUser(name, body);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete an existing user without the relationships',
  })
  @ApiResponse({
    status: 200,
    description: 'User Deleted',
    type: ResponseUserDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public deleteUser() { }

  @Put()
  @ApiOperation({
    summary: 'Update an existing user given JSON information',
  })
  @ApiResponse({
    status: 200,
    description: 'User Updated',
    type: ResponseUserDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public updateUser() { }
}
