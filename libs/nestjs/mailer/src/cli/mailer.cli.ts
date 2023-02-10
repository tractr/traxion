import { Command, Console } from 'nestjs-console';
import * as mailjet from 'node-mailjet';

import { MailerService } from '../services';

@Console({
  command: 'mailer',
})
export class MailerCliService {
  constructor(private readonly mailerService: MailerService) {}

  @Command({
    command: 'send <recipient.name@email.com>',
    description: 'Send a mail to recipient',
  })
  public async send(email: string): Promise<void> {
    const params: mailjet.Email.SendParams = this.getSendEmailParams(email);
    try {
      const response = await this.mailerService.send(params);
      console.info(response);
    } catch (e) {
      console.warn(e);
    }
  }

  private getSendEmailParams(email: string): mailjet.Email.SendParams {
    return {
      Messages: [
        {
          From: {
            Email: 'dt@trxn.net',
            Name: 'Tractr',
          },
          To: [
            {
              Email: email,
              Name: 'Jean Claude',
            },
          ],
          Subject: 'This is an email to test Node Mailer Module',
          TextPart:
            'Dear Jean Claude, welcome to Mailjet! May the delivery force be with you!',
          HTMLPart:
            '<h3>Dear Jean Claude, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
        },
      ],
    };
  }
}
