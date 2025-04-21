import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class MagnetoService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly emailService: EmailService,
  ) {}

  @Cron('0 30 10 * * 1') // Monday at 10:30 AM
  private async sendProfilesToMagneto() {
    const regularUsers = await this.userService.findAllRegular();
    const magnetoUrl = this.configService.get<string>('magneto.exportUrl');
    const confirmationEmailUrl = this.configService.get<string>(
      'email.profilers.mail',
    );
    if (!magnetoUrl) {
      throw Error('Magneto URL no found!');
    }

    try {
      await firstValueFrom(
        this.httpService.post(magnetoUrl, { users: regularUsers }),
      );
      if (!confirmationEmailUrl) {
        console.error(
          'No email direction was found to send confirmation email',
        );
      } else {
        await this.emailService.sendConfirmationMagnetoEmail(
          confirmationEmailUrl,
          regularUsers.length,
        );
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Magneto API error:', error.message);
        console.error('Response data:', error.response?.data);
        if (!confirmationEmailUrl) {
          console.error(
            'No email direction was found to send confirmation email',
          );
        } else {
          await this.emailService.sendBadConfirmationMagnetoEmail(
            error.message,
            confirmationEmailUrl,
            0,
          );
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }
}
