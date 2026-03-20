import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FeedbackStatus } from 'src/enum/feedback/feedback';

export type FeedbackDocument = Feedback & Document;

@Schema({ timestamps: true })
export class Feedback extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  name: string; // name of the person who posted

  @Prop({ default: 0 })
  votes: number; // vote count

  @Prop({ default: FeedbackStatus.open})
  status: FeedbackStatus;
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback);