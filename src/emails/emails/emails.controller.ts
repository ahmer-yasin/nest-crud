import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { EmailsService } from './email.service';
import { RegisterEmailsDTO } from './dto/create-email.dto';
import { EditEmailsDTO } from './dto/edit-emails.dto';
import { Emails } from '../../schemas/emails/emails.entity';

@Controller('emails')
export class EmailsController {
  constructor(private emailSerivce: EmailsService) {}

  @Get()
  public async getEmails(): Promise<Emails[]> {
    return await this.emailSerivce.findAll();
  }

  @Get(':id')
  public async getOneEmail(@Param('id') id: string): Promise<Emails> {
    return await this.emailSerivce.findOne(id);
  }

  @Post('')
  public async postEmails(
    @Body() body: RegisterEmailsDTO.Input,
  ): Promise<Emails> {
    return await this.emailSerivce.create(body);
  }

  @Put(':id')
  public async updateEmails(
    @Param('id') id: string,
    @Body() body: EditEmailsDTO.Input,
  ): Promise<any> {
    return await this.emailSerivce.update(id, body);
  }

  @Delete(':id')
  public async deleteEmail(@Param('id') id: any): Promise<any> {
    return await this.emailSerivce.delete(id);
  }

  @Post('/sent-the-draft')
  public async sentEmail(
    @Body() body: RegisterEmailsDTO.Input,
  ): Promise<Emails> {
    return await this.emailSerivce.create(body, true);
  }

  @Put('/cancel-message/:id')
  public async cancelMessage(@Param('id') id: string): Promise<any> {
    return await this.emailSerivce.cancelMessage(id);
  }
}
