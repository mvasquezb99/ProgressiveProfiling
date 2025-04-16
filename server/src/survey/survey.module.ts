import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [UserModule, EmailModule],
  providers: [SurveyService],
})
export class SurveyModule {}
