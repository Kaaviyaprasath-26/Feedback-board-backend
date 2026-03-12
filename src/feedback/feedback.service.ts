import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { Feedback, FeedbackDocument } from 'src/schema/feedback.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { FeedbackStatus } from 'src/enum/feedback/feedback';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel(Feedback.name)
    private feedbackModel: Model<FeedbackDocument>
  ) {}

  async createFeedback(createFeedbackDto: CreateFeedbackDto) {
    try {
      await this.feedbackModel.create(createFeedbackDto);

      return {
        message: 'Feedback created successfully',
        status: 201
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to create feedback');
    }
  }

  // get all feedbacks
  async getAllFeedbacks(status?: FeedbackStatus) {
    try {
      let feedbacks;
      if(status === FeedbackStatus.all){
        feedbacks = await this.feedbackModel.find().sort({ createdAt: -1 });
      }
      else {
        feedbacks = await this.feedbackModel.find({ status }).sort({ createdAt: -1 });
      }
      

      return {
        message: 'Feedbacks fetched successfully',
        status: 200,
        data: feedbacks
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch feedbacks');
    }
  }

  async updateFeedback(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    try {
      if(!Types.ObjectId.isValid(id)){
        throw new NotFoundException('Invalid feedback ID');
      }
      const updatedFeedback = await this.feedbackModel.findByIdAndUpdate(id, 
        {
          $inc: {votes: 1},
        }, { new: true });


      if (!updatedFeedback) {
        throw new NotFoundException('Feedback not found');
      }

      return {
        message: 'Feedback updated successfully',
        status: 200,
        data: updatedFeedback
      };

    } catch (error) {
      throw new InternalServerErrorException('Failed to update feedback');
    }
  }

  async deleteFeedback(id: string) {
    try {
      const deletedFeedback = await this.feedbackModel.findByIdAndDelete(id);

      if (!deletedFeedback) {
        throw new NotFoundException('Feedback not found');
      }

      return {
        message: 'Feedback deleted successfully',
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete feedback');
    }
  }
}