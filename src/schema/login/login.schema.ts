import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

export type LoginDocuments = Login & Document;

@Schema({ timestamps: true })
export class Login extends Document {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user_id: Types.ObjectId;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: true;
}

export const LoginSchema = SchemaFactory.createForClass(Login);