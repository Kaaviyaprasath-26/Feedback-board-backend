import {
  Controller, Get, Post, Body, Patch, Param,
  Delete, Query, UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackStatus } from 'src/enum/feedback/feedback';

@ApiTags("Feedback")
@Controller('/api/feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @Post('/add')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: 'Create a new feedback' })
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.createFeedback(createFeedbackDto);
  };

  @Get('/list')
  @ApiBearerAuth('jwt')
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({
    name: 'status',
    enum: FeedbackStatus,
    required: false
  })
  @ApiOperation({ summary: "Get all feedbacks" })
  findAll(@Query('status') status?: FeedbackStatus) {
    return this.feedbackService.getAllFeedbacks(status);
  };

  @Patch('/edit/:id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: "Upvote the feedback" })
  update(@Param('id') id: string) {
    return this.feedbackService.updateFeedback(id);
  }

  @Delete('/delete/:id')
  @ApiBearerAuth('jwt')
  @ApiOperation({ summary: "Delete the feedback" })
  remove(@Param('id') id: string) {
    return this.feedbackService.deleteFeedback(id);
  }
}