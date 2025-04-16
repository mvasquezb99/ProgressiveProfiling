import { IsString } from 'class-validator';
import { Answer } from '../survey.types';

export class RequestSurveyDto {
  @IsString()
  userName: string;

  answer: Answer;

  @IsString()
  occupationName: string;
}
