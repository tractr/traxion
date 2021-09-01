---
id: mailjet
title: How to use Mailjet
sidebar_label: Mailjet
keywords: 
  - nestjs
  - mailer
  - mailjet
tags:
  - label: NestJS
    permalink: nestjs
  - label: Mailer
    permalink: mailer
  - label: Mailjet
    permalink: mailjet
---

:::info
- Package's author: [Benjamin Testé](https://github.com/benjamin1555)
:::


# Install

`npm i --save @tractr/nestjs-mailer`

# Overview

Nestjs-mailer package is basically a NestJS wrapper around [node-mailjet package](https://www.npmjs.com/package/node-mailjet).

### Authentication

To use Nestjs-mailer you need to provide valid API and secret keys for authentication. Grab your Mailjet API credentials on [Mailjet website](https://app.mailjet.com/).
If you use a .env file just include them as follow:

```
MAILER_PUBLIC_API_KEY=your_mailjet_public_key  
MAILER_PRIVATE_API_KEY=your_mailjet_private_key
```

### Send an email

Once the installation process is complete, we can import the Nestjs-mailer into the root AppModule and add the MailerService as a provider.

``` typescript
import { Module } from '@nestjs/common';
import { MailerModule, MailerService } from '@tractr/nestjs-mailer';

@Module({
  imports: [
    MailerModule.register({ 
      publicApiKey: process.env.MAILER_PUBLIC_API_KEY, 
      privateApiKey: process.env.MAILER_PRIVATE_API_KEY
    }),
  ],
  providers: [MailerService]
})
export class AppModule {}
```

The package exposes a send() function and has the following signature:

``` typescript
send(params: mailjet.Email.SendParams): Promise<mailjet.Email.PostResponse | null> 
```

To be able to use it, simply inject the MailerService in your class constructor and call its send() function:

``` typescript
constructor(private mailerService: MailerService) {}

async sendEmail() {
  try {
    const postResponse = await this.mailerService.send(params);
  } catch(e) {
    console.error(e);
  }
}
```

For a complete list of properties you can pass in the params object, visit [Mailjet API reference](https://dev.mailjet.com/email/reference/send-emails#v3_1_post_send).