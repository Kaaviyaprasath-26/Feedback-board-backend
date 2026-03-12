import {IsEnum, isEnum, IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import { FeedbackStatus } from 'src/enum/feedback/feedback';

export class CreateFeedbackDto {

    @IsNotEmpty({
        message: 'Title is required'
    })
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    votes: number;

    @IsOptional()
    @IsString()
    @IsEnum(FeedbackStatus)
    status: FeedbackStatus;

}
