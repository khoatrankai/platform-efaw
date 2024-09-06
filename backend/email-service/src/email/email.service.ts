import { MailerService } from '@nestjs-modules/mailer';
import { Injectable} from '@nestjs/common';
@Injectable()
export class EmailService {
  constructor( private mailerService:MailerService) {
  
  }
  async sendMail(to: string, subject: string, text: string) {
    return await this.mailerService.sendMail({to,subject,text})
  }
}
