import { Module } from '@nestjs/common';
import { EmailsController } from './emails/emails.controller';
import { EmailSchema, Emails } from '../schemas/emails/emails.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailsService } from './emails/email.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Emails.name, schema: EmailSchema }]),
  ],
  controllers: [EmailsController],
  providers: [EmailsService],
})
export class EmailsModule {}
