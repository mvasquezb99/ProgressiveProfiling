import { PosthogEventDto } from './posthog-event.dto';

export class PosthogEventsResponseDto {
  next: string | null;
  results: PosthogEventDto[];
}
