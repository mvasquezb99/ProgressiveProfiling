import { Module } from '@nestjs/common';
import { PosthogService } from './posthog.service';
import { HttpModule } from '@nestjs/axios';
import { PosthogController } from './posthog.controller';
import { UserModule } from 'src/user/user.module';
import { QueryModule } from 'src/query/query.module';

@Module({
  imports: [HttpModule, UserModule, QueryModule],
  providers: [PosthogService],
  controllers: [PosthogController],
})
export class PosthogModule {}
