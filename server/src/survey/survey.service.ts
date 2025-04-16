import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SurveyService {
  constructor(
    private usersService: UserService,
    private emailService: EmailService,
  ) {}

  // @Cron('0 10 * * *') // Every day at 10 AM
  @Cron('30 * * * * *') // Every 30 seconds
  async sendSurveys() {
    // TODO: De las occupaciones actuales buscar sugerir una nueva

    // const users = await this.usersService.findAll();
    const manuel = await this.usersService.findByName('Manuel');
    manuel.email = 'manelix22@gmail.com';
    const occupationNamesSet: Set<string> = new Set(
      manuel.occupations.map((occupation) => occupation.name),
    );

    await this.emailService.sendSurveyEmail(
      manuel.email,
      manuel.name,
      'Recomendaciones de cargos',
      Array.from(occupationNamesSet),
      'OCUPACION SUGERIDA',
    );

    console.log('Survey email sent to:', manuel.email);
  }
}
