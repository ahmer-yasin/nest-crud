import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = Emails & Document;

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
}

export const EmailSchema = SchemaFactory.createForClass(Emails);
