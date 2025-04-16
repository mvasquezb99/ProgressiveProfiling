import { Controller, Post, Body } from '@nestjs/common';

@Controller('survey-response')
export class SurveyController {
  @Post()
  handleResponse(
    @Body() body: { userName: string; field: string; answer: string },
  ) {
    const { userName, field, answer } = body;
    console.log(`User ${userName} responded to ${field}: ${answer}`);
    return { message: 'Thank you for your response!' };
  }
}
