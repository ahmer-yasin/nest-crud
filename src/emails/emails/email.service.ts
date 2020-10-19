import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Emails, EmailDocument } from '../../schemas/emails/emails.entity';
import { RegisterEmailsDTO } from './dto/create-email.dto';
import { EditEmailsDTO } from './dto/edit-emails.dto';

@Injectable()
export class EmailsService {
  constructor(
    @InjectModel(Emails.name) private emailsModel: Model<EmailDocument>,
  ) {}

  async create(createEmail: RegisterEmailsDTO.Input): Promise<Emails> {
    const createdEmail = new this.emailsModel(createEmail);
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
    if (editEmail.to) {
      editedEmail.to = editedEmail.to;
    }
    if (editEmail.from) {
      editedEmail.from = editedEmail.from;
    }
    if (editEmail.subject) {
      editedEmail.subject = editedEmail.subject;
    }
    if (editEmail.body) {
      editedEmail.body = editedEmail.body;
    }
    return editedEmail.save();
  }

  async delete(_id: string): Promise<any> {
    return await this.emailsModel.remove({ _id });
  }
}
