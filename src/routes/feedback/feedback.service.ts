import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { Feedback, FeedbackDocument } from 'src/schema/feedback.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedbackStatus } from 'src/enum/feedback/feedback';
import { ValidateObjectId } from 'src/utils/validate-object-id.util';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name)
    private feedbackModel: Model<FeedbackDocument>
  ) { }

  async createFeedback(createFeedbackDto: CreateFeedbackDto) {
    const feedback = await this.feedbackModel.create(createFeedbackDto);

    return {
      message: 'Feedback created successfully',
      data: feedback
    }
  }

  // get all feedbacks
  async getAllFeedbacks(status?: FeedbackStatus) {
    const filter = (status && status !== FeedbackStatus.all) ? { status } : {};
    const feedbacks = await this.feedbackModel.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return {
      message: 'Feedbacks fetched successfully',
      data: feedbacks
    }
  }

  // Update votes for Feedback
  async updateFeedback(id: string) {
    ValidateObjectId(id);

    const updatedFeedback = await this.feedbackModel.findByIdAndUpdate(id,
      { $inc: { votes: 1 } },
      { new: true });

    if (!updatedFeedback) {
      throw new NotFoundException('Feedback not found');
    }

    return {
      message: 'Feedback updated successfully',
      data: updatedFeedback
    };
  }

  async deleteFeedback(id: string) {
    ValidateObjectId(id);

    const deletedFeedback = await this.feedbackModel.findByIdAndDelete(id);

    if (!deletedFeedback) {
      throw new NotFoundException('Feedback not found');
    }

    return {
      message: 'Feedback deleted successfully',
    };
  }
}