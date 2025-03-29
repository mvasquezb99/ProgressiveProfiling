import {
  Body,
  Controller,
  Delete,
  Get,
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
  RequestFinalUserUpdateDto,
} from 'src/user/dto/request-final-user.dto';
import { UpdateRelationshipsDto } from './dto/request-update-relationships.dto';

@ApiTags('admin/users')
@Controller('admin/users')
export class AdminUserController {
  public constructor(private readonly adminUserService: AdminUserService) {}

  @Get()
  @ApiOperation({ summary: 'Get a user given the name' })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: ResponseUserDto,
  })
  public async getUserByName(@Query('name') name: string) {
    return await this.adminUserService.getUserByName(name);
  }

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
    type: ResponseUserDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async relateUser(
    @Query('name') name: string,
    @Body() body: UpdateRelationshipsDto,
  ) {
    return await this.adminUserService.relateUser(name, body);
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
  public async deleteUser(@Query('name') name: string) {
    return await this.adminUserService.deleteUserByName(name);
  }

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
  public async updateUser(@Body() body: RequestFinalUserUpdateDto) {
    return await this.adminUserService.updateUserByName(body);
  }
}
