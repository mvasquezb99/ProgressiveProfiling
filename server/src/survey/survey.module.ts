import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { UserModule } from 'src/user/user.module';
import { EmailModule } from 'src/email/email.module';
import { QueryModule } from 'src/query/query.module';

@Module({
  imports: [UserModule, EmailModule, QueryModule],
  providers: [SurveyService],
  exports: [SurveyService],
})
export class SurveyModule {}
