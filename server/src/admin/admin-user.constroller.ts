import {
  Controller,
  Delete,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from 'src/user/dto/response-user.dto';
import { AdminUserService } from './admin-user.service';

@ApiTags('admin/users')
@Controller('admin/users')
export class AdminUserController {
  // TODO:
  // 1. Create users from a JSON with a list of users with all info
  // 2. Create a single user from a JSON with all the info
  // 3. Create a user without relationships
  // 4. Relate a existing user with a relationship
  // 5. Delete a existing user without relationships
  // 6. Update a existing user

  public constructor(
    private readonly adminUserService: AdminUserService = new AdminUserService(),
  ) { }

  @Post()
  @ApiOperation({
    summary: 'Create users from a JSON with a list of users with all info',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users created',
    type: [ResponseUserDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public saveUsers() { }

  @Post('single')
  @ApiOperation({
    summary: 'Create a single user from a JSON with all the info',
  })
  @ApiResponse({
    status: 200,
    description: 'User created',
    type: ResponseUserDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public saveUser() { }

  @Post('single-no-relationships')
  @ApiOperation({
    summary: 'Create a single user from a JSON with no relationships',
  })
  @ApiResponse({
    status: 200,
    description: 'User with no relationships created',
    type: ResponseUserDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public saveUserNoRelationships() { }

  @Post('relate/{id}')
  @ApiOperation({
    summary: 'Relate an existing user with a relationship from a JSON',
  })
  @ApiResponse({
    status: 200,
    description: 'User related with some relationship',
    type: ResponseUserDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public relateUser() { }

  @Delete('/{id}')
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

  @Put('/{id}')
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
