import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = Emails & Document;

export const enum MessageType {
  'DRAFT' = 'draft',
  'INBOX' = 'inbox',
  'SENT' = 'sent',
  'SENDABLE' = 'sendable',
  'SPAM' = 'spam',
  'TRASH' = 'trash',
}
@Schema()
export class Emails {
  @Prop({ required: true })
  to: string;

  @Prop({ required: true })
  from: string;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  body: string;

  @Prop({
    type: Date,
    default: null,
  })
  cancelExpireTime: Date;

  @Prop({
    default: MessageType.INBOX,
    enum: [
      MessageType.DRAFT,
      MessageType.SENT,
      MessageType.INBOX,
      MessageType.SPAM,
      MessageType.TRASH,
    ],
  })
  messageType: MessageType;
}

export const EmailSchema = SchemaFactory.createForClass(Emails);
