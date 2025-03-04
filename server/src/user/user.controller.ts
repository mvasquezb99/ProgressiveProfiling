import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto';
import { RequestInfoDto } from './dto/request-info.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    type: [ResponseUserDto],
  })
  findAll(): Promise<ResponseUserDto[]> {
    return this.userService.findAll();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all users that like a certain category' })
  @ApiResponse({
    status: 200,
    description: 'Return all users that like a certain category ',
    type: [ResponseUserDto],
  })
  findAllByOccupation(
    @Query('category') category: string,
  ): Promise<ResponseUserDto[]> {
    return this.userService.findByCategory(category);
  }
  
  @Post('generate')
  @ApiOperation({ summary: 'Generate a profile' })
  @ApiResponse({
    status: 201,
    description: 'Generate a profile',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  generateProfile(@Body() body: RequestInfoDto) {
    return this.userService.generateProfile(body);
  }
}
