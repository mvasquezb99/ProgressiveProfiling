import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PosthogEventsResponseDto } from './dto/posthog-evet-response.dto';
import { AxiosResponse } from 'axios';
import { UserService } from 'src/user/user.service';
import { QueryNode, QueryService } from 'src/query/query.service';
import { OccupationPropertiesI } from 'src/occupation/occupation.model';
import { UserClass } from 'src/user/user.model';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PosthogService {
  apiKey: string;
  projectId: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly userClass: UserClass,
    private readonly queryService: QueryService,
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
          event: 'Job offer event',
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

  async getAllJobOfferEventsLast24h(): Promise<PosthogEventsResponseDto> {
    const after24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const response$ = this.httpService.get<PosthogEventsResponseDto>(
      `https://us.posthog.com/api/projects/${this.projectId}/events/`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        params: {
          event: 'Job offer event',
          after: after24h,
        },
      },
    );
    const response: AxiosResponse<PosthogEventsResponseDto> =
      await firstValueFrom(response$);
    console.log(
      'Number of job offer events in the last 24h:',
      response.data.results.length,
    );
    return response.data;
  }

  async getAllJobOfferAppliedEventsLast24h(): Promise<PosthogEventsResponseDto> {
    const after24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const response$ = this.httpService.get<PosthogEventsResponseDto>(
      `https://us.posthog.com/api/projects/${this.projectId}/events/`,
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        params: {
          event: 'Job offer applied',
          after: after24h,
        },
      },
    );
    const response: AxiosResponse<PosthogEventsResponseDto> =
      await firstValueFrom(response$);
    console.log(
      'Number of job offer applied in the last 24h:',
      response.data.results.length,
    );
    return response.data;
  }

  @Cron('0 0 * * *') // Every day at midnight
  async getAllJobOfferAppliedEventsAndUpdateUsers() {
    const events = await this.getAllJobOfferAppliedEventsLast24h();
    let numUsersUpdated = 0;

    for (const event of events.results) {
      const userEmail = event.distinct_id;
      // const jobOfferName = event.properties.name;
      // const jobOfferCategory = event.properties.category;
      // const jobOfferExperience = event.properties.experience;
      // const jobOfferDuration = event.properties.duration;
      const jobOfferSalary = event.properties.salary;
      // const jobOfferLoction = event.properties.location;
      const jobOfferOccupations = event.properties.occupations;

      try {
        const user = await this.userService.findByEmail(userEmail);
        if (!user) {
          console.error(`Can't identify user with ${userEmail}`);
          continue;
        }
        // Update salary

        const newNumJobApplies = user.numApplications + 1;
        const newPromSalary =
          (Number(user.promSalary) + Number(jobOfferSalary)) / newNumJobApplies;

        await this.userClass.userModel.update(
          {
            promSalary: String(newPromSalary),
            numApplications: newNumJobApplies,
          },
          {
            where: {
              email: userEmail,
            },
          },
        );

        // Update occupations
        const dislikedOccupations = new Array<string>();
        const currentUserOccupaitons = new Array<string>();

        user.occupations.forEach((occupation) => {
          currentUserOccupaitons.push(occupation.name);
        });

        const relationsDislikedNodes =
          await this.queryService.getDislikedOccupationsFromUser(user.name);
        const occupationsDislikedQueryNodes =
          relationsDislikedNodes.records.map((r) => r.get('o') as QueryNode);
        occupationsDislikedQueryNodes.forEach((node) => {
          const props = node.properties as OccupationPropertiesI;
          dislikedOccupations.push(props.name);
        });

        for (const occupation of jobOfferOccupations) {
          if (
            !currentUserOccupaitons.includes(occupation) &&
            !dislikedOccupations.includes(occupation)
          ) {
            await this.userClass.userModel.relateTo({
              alias: 'LikesOccupation',
              where: {
                source: {
                  name: user.name,
                },
                target: {
                  name: occupation,
                },
              },
            });
            numUsersUpdated += 1;
          }
        }
      } catch (err) {
        console.error(`Can't identify user with ${userEmail} - ${err}`);
        continue;
      }
    }
    console.log(`${numUsersUpdated} users occupations updated`);
    return `${numUsersUpdated} users occupations updated`;
  }
}
