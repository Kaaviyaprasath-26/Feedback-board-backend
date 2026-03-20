import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { LoginEnum } from "src/enum/login/Login";

export type UserDocuments = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    country_code: string

    @Prop({ required: true })
    cell_no: number;

    @Prop()
    DOB: string;

    @Prop({ default: LoginEnum.feedbacker })
    role: LoginEnum;

    @Prop({ default: '', required: false, minLength: 8 })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);