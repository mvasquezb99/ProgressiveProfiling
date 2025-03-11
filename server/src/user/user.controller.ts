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
import { RequestInfoAlgorithmDto } from './dto/request-info-algorithm.dto';
import { RequestFinalUserDto } from './dto/request-final-user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Return all users',
    type: [ResponseUserDto],
  })
  public findAll(): Promise<ResponseUserDto[]> {
    return this.userService.findAll();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get all users that like a certain category' })
  @ApiResponse({
    status: 200,
    description: 'Return all users that like a certain category ',
    type: [ResponseUserDto],
  })
  public findAllByOccupation(
    @Query('category') category: string,
  ): Promise<ResponseUserDto[]> {
    return this.userService.findByCategory(category);
  }

  @Post('generate')
  @ApiOperation({ summary: 'Generate a profile' })
  @ApiResponse({
    status: 200,
    description: 'Generate a profile',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public generateProfile(@Body() body: RequestInfoAlgorithmDto) {
    return this.userService.generateProfile(body);
  }

  @Post('save')
  @ApiOperation({ summary: 'Save a user' })
  @ApiResponse({
    status: 201,
    description: 'Save a user',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public saveUser(@Body() body: RequestFinalUserDto) {
    return this.userService.saveUser(body);
  }

  @Get('regular')
  @ApiOperation({ summary: 'Return all of the regular users' })
  @ApiResponse({
    status: 200,
    description: 'Return all of the regular users',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public findAllRegular() {
    return this.userService.findAllRegular();
  }
}
