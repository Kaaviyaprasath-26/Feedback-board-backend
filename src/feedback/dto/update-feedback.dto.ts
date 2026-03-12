import { PartialType } from '@nestjs/mapped-types';
import { CreateFeedbackDto } from './create-feedback.dto';
import { IsEnum, isEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { FeedbackStatus } from 'src/enum/feedback/feedback';

export class UpdateFeedbackDto {

    @IsOptional()
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
