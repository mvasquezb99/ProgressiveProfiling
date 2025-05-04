import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PosthogEventsResponseDto } from './dto/posthog-evet-response.dto';
import { AxiosResponse } from 'axios';

@Injectable()
export class PosthogService {
  apiKey: string;
  projectId: string;
  eventName: string = 'Job offer event';
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.getOrThrow<string>('POSTHOG_API_KEY');
    this.projectId =
      this.configService.getOrThrow<string>('POSTHOG_PROJECT_ID');
  }

  async getAllEvents(): Promise<PosthogEventsResponseDto> {
    const response$ = this.httpService.get<PosthogEventsResponseDto>(
      `https://us.posthog.com/api/projects/${this.projectId}/events/`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      },
    );
    const response: AxiosResponse<PosthogEventsResponseDto> =
      await firstValueFrom(response$);
    console.log('Number of total events:', response.data.results.length);
    return response.data;
  }

  async getAllJobOfferEvents(): Promise<PosthogEventsResponseDto> {
    const response$ = this.httpService.get<PosthogEventsResponseDto>(
      `https://us.posthog.com/api/projects/${this.projectId}/events/`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        params: {
          event: this.eventName,
        },
      },
    );
    const response: AxiosResponse<PosthogEventsResponseDto> =
      await firstValueFrom(response$);
    console.log(
      'Number of total job offer events:',
      response.data.results.length,
    );
    return response.data;
  }

  async getAllJobOfferEventsAndUpdateUsers() {
    const events = await this.getAllJobOfferEvents();
    events.results.forEach((event) => {
      console.log('User identifier:', event.distinct_id);
      console.log('Job Offer name:', event.properties.name);
      console.log('Category name:', event.properties.category);
      console.log('Occupations:', event.properties.occupations);
    });
  }
}
