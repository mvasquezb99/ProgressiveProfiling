import { Module } from '@nestjs/common';
import { QueryService } from './query.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [QueryService],
  exports: [QueryService],
})
export class QueryModule { }
