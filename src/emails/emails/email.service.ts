import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Emails,
  EmailDocument,
  MessageType,
} from '../../schemas/emails/emails.entity';
import { RegisterEmailsDTO } from './dto/create-email.dto';
import { EditEmailsDTO } from './dto/edit-emails.dto';
import * as moment from 'moment';

@Injectable()
export class EmailsService {
  constructor(
    @InjectModel(Emails.name) private emailsModel: Model<EmailDocument>,
  ) {}

  async create(
    createEmail: RegisterEmailsDTO.Input,
    sent = false,
  ): Promise<Emails> {
    const createdEmail = new this.emailsModel(createEmail);
    if (sent) {
      const date = moment().add('minutes', 1);
      createdEmail.cancelExpireTime = date.toDate();
    }
    return createdEmail.save();
  }

  async findAll(): Promise<Emails[]> {
    return this.emailsModel.find().exec();
  }

  async findOne(id: string): Promise<Emails> {
    return await this.emailsModel.findOne({ _id: id });
  }

  async update(id: string, editEmail: EditEmailsDTO.Input): Promise<Emails> {
    const editedEmail = await this.emailsModel.findOne({ _id: id });
    if (!editedEmail) {
      throw new BadRequestException('Invalid Request');
    }
    return this.emailsModel.updateOne({ _id: id }, { $set: editEmail });
  }

  async delete(_id: string): Promise<any> {
    return await this.emailsModel.remove({ _id });
  }

  async cancelMessage(_id: string) {
    console.log(new Date());
    const cancelMessage = await this.emailsModel.findOne({
      _id,
      cancelExpireTime: { $gte: new Date() },
    });
    if (!cancelMessage) {
      throw new BadRequestException('Message cant be cancel');
    }
    cancelMessage.messageType = MessageType.DRAFT;
    return this.emailsModel.updateOne({ _id }, { $set: cancelMessage });
  }
}
