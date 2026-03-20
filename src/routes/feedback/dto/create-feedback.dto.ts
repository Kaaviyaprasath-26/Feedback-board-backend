import { IsEnum, isEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { FeedbackStatus } from 'src/enum/feedback/feedback';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFeedbackDto {

    @ApiProperty({ example: "Add dark mode" })
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: "Title must be a  string" })
    title: string;

    @ApiProperty({ example: "It would be great to have a dark mode option for better user experience during night time." })
    @IsNotEmpty({ message: 'Description is required' })
    @IsString({ message: "Description must be a string" })
    description: string;

    @ApiProperty({ example: "John Doe" })
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: "Name must be a string" })
    name: string;

    @ApiProperty({ example: 0 })
    @IsOptional()
    @IsNumber({}, { message: 'Votes must be a number' })
    @Min(0, { message: 'Votes must be a non-negative number' })
    votes?: number;

    @ApiProperty({
        enum: FeedbackStatus,
        example: FeedbackStatus.open
    })
    @IsOptional()
    @IsEnum(FeedbackStatus, { message: `Status must be one of the following values: ${Object.values(FeedbackStatus).join(', ')}` })
    status?: FeedbackStatus;
};