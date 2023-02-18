# MailerModule

This module provides a MailerService that can be used to send emails.

## Installation

```bash
npm i --save @trxn/nestjs-mailer @trxn/nestjs-mailjet
```

## Quick Start

First configure the mailjet module, the documentation can be found [here](https://www.traxion.dev/docs/how-to/mailer/use-mailjet).

Then, import the MailerModule in your root application module:

```ts
import { Module } from '@nestjs/common';
import { MailjetModule as Mailjet } from '@trxn/nestjs-mailjet';
import { MailerModule } from '@trxn/nestjs-mailer';

@Module({
  imports: [
    Mailjet.register({
      apiKey: 'YOUR_MAILER_API_KEY',
    }),
  ],
})
export class MailjetModule {}

@Module({
  imports: [
    MailerModule.register({
      imports: [MailjetModule],
      production: process.env.NODE_ENV === 'production',
    }),
  ],
})
export class MailerModule {}

@Module({
  imports: [
    MailerModule,
  ],
})
export class AppModule {}
```

In the example above and in order to use the mailerModule in an efficient way you must separate your declaration into multiple submodules. The MailjetModule expose internally a `MAILER_CLIENT` provider that is directly used inside the `MailerModule`. You can use the `MailjetModule` or another module of you choice to be able to send email with `MailerModule`. The other traxion module that use the emails providers will inject a `MailerService` that comme from the `MailerModule`.

Then to use the MailerService to send an email, inject it into your service or controller:

```ts
import { Controller, Get, Inject } from '@nestjs/common';
import { MailerService } from '@trxn/nestjs-mailer';

@Controller()
export class AppController {
  constructor(
    @Inject(MailerService) private readonly mailerService: MailerService,
  ) {}

  @Get()
  async sendEmail(): Promise<void> {
    const email = {
      from: 'YOUR_EMAIL_ADDRESS',
      to: 'RECIPIENT_EMAIL_ADDRESS',
      subject: 'Test email',
      text: 'This is a test email',
    };
    await this.mailerService.send(email);
  }
}
```

In the example above, the MailerService is injected into the AppController and used to send an email with a from address, to address, subject, and text content.

## MailerModule Options

The register() and registerAsync() methods accept an options object of type MailerModuleOptions.

| Property | Type | Description |
| --- | --- | --- |
| `production` | `boolean` | (optional) Default to `false`, tell the module to really send the email when set to true |

## MailerService Methods

The MailjetService provides a single method for sending email:

### send

```ts
send(params: SendEmailParams): Promise<any>
````

Sends an email using the Mailjet API.

| Property | Type | Description |
| --- | --- | --- |
| `params` | `SendEmailParams` | The email parameters. |

The SendEmailParams interface has the following properties:

```ts
interface SendEmailParams {
  from: string;
  to: string | string[];
  subject?: string;
  html?: string;
  text?: string;
  context?: Record<string, any>;
}
```

## Conclusion

The nestjs-mailer module provides a simple and convenient way to allow you to shadow your email provider behind a contractual interface. The other module from traxion will use the `MailerModule` and his `MailerService` to send email when needed.
