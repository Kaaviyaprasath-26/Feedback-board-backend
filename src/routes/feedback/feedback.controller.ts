import {
  Controller, Get, Post, Body, Patch, Param,
  Delete, Query, UseInterceptors
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackStatus } from 'src/enum/feedback/feedback';
import { JwtAuth } from 'src/common/decorators/jwt-auth.decorators';

@ApiTags("Feedback")
@Controller('/api/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post('/add')
  @JwtAuth("Create a new feedback")
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(createFeedbackDto);
  };

  @Get('/list')
  @UseInterceptors(CacheInterceptor)
  @JwtAuth("Get all feedbacks")
  @ApiQuery({
    name: 'status',
    enum: FeedbackStatus,
    required: false
  })
  findAll(@Query('status') status?: FeedbackStatus) {
    return this.feedbackService.getAllFeedbacks(status);
  };

  @Patch('/edit/:id')
  @JwtAuth("Upvote the feedback")
  update(@Param('id') id: string) {
    return this.feedbackService.updateFeedback(id);
  }

  @Delete('/delete/:id')
  @JwtAuth("Delete the feedback")
  remove(@Param('id') id: string) {
    return this.feedbackService.deleteFeedback(id);
  }
}