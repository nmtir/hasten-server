import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  constructor(private readonly configService: ConfigService<AllConfigType>) {}

  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: 'smtp-relay.sendinblue.com', // Brevo's SMTP host
        port: 587, // Port for TLS
        secure: false, // Use STARTTLS (not SSL)
        auth: {
          user: this.configService.get('mail.user', { infer: true }), // Brevo SMTP user (your email)
          pass: this.configService.get('mail.password', { infer: true }), // Brevo SMTP password (API key)
        },
      },
      defaults: {
        from: `"${this.configService.get('mail.defaultName', {
          infer: true,
        })}" <${this.configService.get('mail.defaultEmail', { infer: true })}>`,
      },
      template: {
        dir: path.join(
          this.configService.getOrThrow('app.workingDirectory', {
            infer: true,
          }),
          'src',
          'mail',
          'mail-templates',
        ),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    } as MailerOptions;
  }
}
