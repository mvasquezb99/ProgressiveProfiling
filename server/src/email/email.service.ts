import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { renderTemplate } from 'src/utils/ejs-util';

interface SurveyEmailData {
  userName: string;
  field: string;
  question: string;
  currentsOccupations: string[];
  suggestedOccupation: string;
  url?: string;
}

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
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
      url: process.env.SURVEY_URL,
    });

    await this.transporter.sendMail({
      from: '"Survey Bot" <no-reply@profilers.com>',
      to: email,
      subject: `We need your ${field}`,
      html,
    });
  }
}
