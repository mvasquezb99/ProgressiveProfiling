import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseOccupationCategoryDto } from 'src/occupation-category/dto/response-occupation-category.dto';
import { AdminOccupationCategoryService } from './admin-occupation-category.service';
import {
  RequestOccupationCategoryArrayDto,
  RequestOccupationCategoryDto,
} from 'src/occupation-category/dto/request-occupation-category.dto';
import { RelateCategoryWithOccupationDto } from './dto/request-update-relationships.dto';

@ApiTags('admin/categories')
@Controller('admin/categories')
export class AdminOccupationCategoryController {
  public constructor(
    private readonly adminOccupationCategoryService: AdminOccupationCategoryService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all occupation categories' })
  @ApiResponse({
    status: 200,
    description: 'All categories',
    type: [ResponseOccupationCategoryDto],
  })
  public async getAllCategories() {
    return await this.adminOccupationCategoryService.getAllCategories();
  }

  @Get('single')
  @ApiOperation({ summary: 'Get occupation categories by name' })
  @ApiResponse({
    status: 200,
    description: 'Category with the entered name',
    type: ResponseOccupationCategoryDto,
  })
  public async getCategoryByName(@Query('name') name: string) {
    return await this.adminOccupationCategoryService.getCategoryByName(name);
  }

  @Post()
  @ApiOperation({ summary: 'Add many categories' })
  @ApiResponse({
    status: 201,
    description: 'Categories added',
    type: [ResponseOccupationCategoryDto],
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async saveCategories(@Body() body: RequestOccupationCategoryArrayDto) {
    return await this.adminOccupationCategoryService.saveCategories(body);
  }

  @Post('single')
  @ApiOperation({ summary: 'Add a category' })
  @ApiResponse({
    status: 201,
    description: 'Category added',
    type: ResponseOccupationCategoryDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async saveCategory(@Body() body: RequestOccupationCategoryDto) {
    return await this.adminOccupationCategoryService.saveCategory(body);
  }

  @Post('relate')
  @ApiOperation({
    summary: 'Relate a category to a occupation',
  })
  @ApiResponse({
    status: 201,
    description: 'Category with all occupations',
    type: ResponseOccupationCategoryDto,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  public async saveOccupation(@Body() body: RelateCategoryWithOccupationDto) {
    return await this.adminOccupationCategoryService.relateCategoryToOccupation(
      body,
    );
  }
}
