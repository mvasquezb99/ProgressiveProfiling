import { Controller, Get } from '@nestjs/common';
import { PosthogService } from './posthog.service';

@Controller('posthog')
export class PosthogController {
  constructor(private readonly posthogService: PosthogService) {}

  @Get('events')
  public async getAllEvents() {
    return await this.posthogService.getAllEvents();
  }

  @Get('events/job-offers')
  public async getAllJobOfferEvents() {
    return await this.posthogService.getAllJobOfferEvents();
  }

  @Get('events/job-offers/update-users')
  public async getAllJobOfferEventsAndUpdateUsers() {
    return await this.posthogService.getAllJobOfferEventsAndUpdateUsers();
  }
}
