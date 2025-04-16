import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RequestSurveyDto } from './dto/request-survey.dto';
import { SurveyService } from './survey.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('survey-response')
@Controller('survey-response')
export class SurveyController {
  public constructor(private readonly surveyService: SurveyService) {}

  @Post()
  @ApiOperation({ summary: 'Handle user email response' })
  @ApiResponse({
    status: 201,
    description: 'User likes or dislikes the suggested occupation',
    type: String,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  handleResponse(@Body() body: RequestSurveyDto) {
    console.log(
      `User ${body.userName} responded with answer ${body.answer} to occupation ${body.occupationName}`,
    );
    return this.surveyService.manageResponse(body);
  }
}
