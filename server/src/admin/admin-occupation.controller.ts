import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseOccupationDto } from 'src/occupation/dto/response-occupation.dto';
import { AdminOccupationService } from './admin-occupation.service';
import {
  RequestOccupationArrayDto,
  RequestOccupationDto,
} from 'src/occupation/dto/request-occupation.dto';

@ApiTags('admin/occupations')
@Controller('admin/occupations')
export class AdminOccupationController {
  public constructor(
    private readonly adminOccupationService: AdminOccupationService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all occupations' })
  @ApiResponse({
    status: 200,
    description: 'All occupations',
    type: [ResponseOccupationDto],
  })
  public async getAllOccupations() {
    return await this.adminOccupationService.getAllOccupations();
  }

  @Get('single')
  @ApiOperation({ summary: 'Get occupation by name' })
  @ApiResponse({
    status: 200,
    description: 'Occupation with the entered name',
    type: ResponseOccupationDto,
  })
  public async getOccupationByName(@Query('name') name: string) {
    return await this.adminOccupationService.getOccupationByName(name);
  }

  @Post()
  @ApiOperation({ summary: 'Add many occupations' })
  @ApiResponse({
    status: 201,
    description: 'Occupations added',
    type: [ResponseOccupationDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async saveOccupations(@Body() body: RequestOccupationArrayDto) {
    return await this.adminOccupationService.saveOccupations(body);
  }

  @Post('single')
  @ApiOperation({ summary: 'Add a occupation' })
  @ApiResponse({
    status: 201,
    description: 'Occupation added',
    type: ResponseOccupationDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async saveOccupation(@Body() body: RequestOccupationDto) {
    return await this.adminOccupationService.saveOccupation(body);
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete an existing occupation by name',
  })
  @ApiResponse({
    status: 201,
    description: 'Occupation Deleted',
    type: ResponseOccupationDto,
  })
  public async deleteOccupation(@Query('name') name: string) {
    return await this.adminOccupationService.deleteOccupation(name);
  }
}
