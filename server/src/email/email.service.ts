import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { renderTemplate } from 'src/utils/ejs-util';

interface SurveyEmailData {
  userName: string;
  field: string;
  question: string;
  currentsOccupations: string[];
  suggestedOccupation: string;
  url: string;
}

interface ConfirmationEmailData {
  numUsers: number;
  field: string;
}

interface BadConfirmationEmailData {
  errorMessage: string;
  numUsers: number;
  field: string;
}

@Injectable()
export class EmailService {
  public constructor(private readonly configService: ConfigService) {}

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: this.configService.get<string>('email.profilers.mail'),
      pass: this.configService.get<string>('email.profilers.pass'),
    },
  });

  async sendSurveyEmail(
    email: string,
    userName: string,
    field: string,
    currentsOccupations: string[],
    suggestedOccupation: string,
  ) {
    const templatePath = path.join(__dirname, 'templates', 'question.ejs');
    const html = await renderTemplate<SurveyEmailData>(templatePath, {
      userName: userName,
      field,
      question: `Please tell us your ${field}`,
      currentsOccupations: currentsOccupations,
      suggestedOccupation: suggestedOccupation,
      url:
        this.configService.get<string>('email.surveyUrl') ||
        'http://localhost:5173/survey-response',
    });

    await this.transporter.sendMail({
      from: '"Survey Bot" <no-reply@profilers.com>',
      to: email,
      subject: `We need your ${field}`,
      html,
    });
  }

  public async sendConfirmationMagnetoEmail(email: string, numUsers: number) {
    const field = 'Email de confirmación';
    const templatePath = path.join(__dirname, 'templates', 'confirmation.ejs');
    const html = await renderTemplate<ConfirmationEmailData>(templatePath, {
      numUsers: numUsers,
      field: field,
    });

    await this.transporter.sendMail({
      from: '"Survey Bot" <no-reply@profilers.com>',
      to: email,
      subject: `${field}`,
      html,
    });
  }

  public async sendBadConfirmationMagnetoEmail(
    errorMessage: string,
    email: string,
    numUsers: number,
  ) {
    const field = 'Error en el envio de perfiles';
    const templatePath = path.join(
      __dirname,
      'templates',
      'error-confirmation.ejs',
    );
    const html = await renderTemplate<BadConfirmationEmailData>(templatePath, {
      errorMessage: errorMessage,
      numUsers: numUsers,
      field: field,
    });

    await this.transporter.sendMail({
      from: '"Survey Bot" <no-reply@profilers.com>',
      to: email,
      subject: `${field}`,
      html,
    });
  }
}
