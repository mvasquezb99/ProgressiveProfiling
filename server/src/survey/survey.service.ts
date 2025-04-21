import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from 'src/email/email.service';
import { OccupationPropertiesI } from 'src/occupation/occupation.model';
import { QueryNode, QueryService } from 'src/query/query.service';
import { UserService } from 'src/user/user.service';
import { Answer } from './survey.types';
import { RequestSurveyDto } from './dto/request-survey.dto';
import { UserClass } from 'src/user/user.model';

@Injectable()
export class SurveyService {
  constructor(
    private readonly usersService: UserService,
    private readonly userClass: UserClass,
    private readonly emailService: EmailService,
    private readonly queryService: QueryService,
  ) {}

  @Cron('0 10 * * *') // Every day at 10 AM
  // @Cron('30 * * * * *')
  private async sendSurveys() {
    const users = await this.usersService.findAllRegular();
    for (const user of users) {
      if (!user.email) {
        continue;
      }
      const dislikedOccupations = new Array<string>();
      const currentUserOccupaitons = new Array<string>();
      const possibleSuggestedOccupations = new Array<string>();
      let searchTryCont = 0;
      let randomOccupation = '';

      user.occupations.forEach((occupation) => {
        currentUserOccupaitons.push(occupation.name);
      });

      const relationsDislikedNodes =
        await this.queryService.getDislikedOccupationsFromUser(user.name);
      const occupationsDislikedQueryNodes = relationsDislikedNodes.records.map(
        (r) => r.get('o') as QueryNode,
      );
      occupationsDislikedQueryNodes.forEach((node) => {
        const props = node.properties as OccupationPropertiesI;
        dislikedOccupations.push(props.name);
      });

      for (const category of user.categories) {
        const relationsNodes =
          await this.queryService.getOccupationsFromCategory(category.name);
        const occupationsQueryNodes = relationsNodes.records.map(
          (r) => r.get('o') as QueryNode,
        );
        occupationsQueryNodes.forEach((node) => {
          const props = node.properties as OccupationPropertiesI;
          possibleSuggestedOccupations.push(props.name);
        });
      }

      if (possibleSuggestedOccupations.length > 0) {
        while (searchTryCont < 5) {
          const randomIndex = Math.floor(
            Math.random() * possibleSuggestedOccupations.length,
          );
          randomOccupation = possibleSuggestedOccupations[randomIndex];
          if (
            !currentUserOccupaitons.includes(randomOccupation) &&
            !dislikedOccupations.includes(randomOccupation)
          ) {
            break;
          } else {
            searchTryCont += 1;
          }
        }
      } else {
        console.log('No occupations to suggest for user', user.name);
        continue;
      }

      const ownOccupationNamesSet: Set<string> = new Set(
        user.occupations.map((occupation) => occupation.name),
      );

      await this.emailService.sendSurveyEmail(
        user.email,
        user.name,
        'Recomendaciones de cargos',
        Array.from(ownOccupationNamesSet),
        randomOccupation,
      );

      console.log('Survey email sent to:', user.email);
    }
  }

  public async manageResponse(body: RequestSurveyDto): Promise<string> {
    const user = await this.usersService.findByName(body.userName);
    if (!user) {
      throw Error('User not found');
    }
    if (body.answer == Answer.ACCEPT) {
      await this.userClass.userModel.relateTo({
        alias: 'LikesOccupation',
        where: {
          source: {
            name: user.name,
          },
          target: {
            name: body.occupationName,
          },
        },
      });
      return 'The user likes the occupation';
    } else if (body.answer == Answer.REJECT) {
      await this.userClass.userModel.relateTo({
        alias: 'DislikesOccupation',
        where: {
          source: {
            name: user.name,
          },
          target: {
            name: body.occupationName,
          },
        },
      });
      return 'The user dislikes the occupation';
    } else {
      throw Error('Something happened with the response');
    }
  }
}
