import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";
import { Model, Types } from 'mongoose';
import { User, UserDocuments } from 'src/schema/user/user.schema';
import { CreateUserDto } from './dto/user.dto';
import { ValidateObjectId } from 'src/utils/validate-object-id.util';
import { NotFoundException } from '@nestjs/common';
import { UserCommenAggregation } from 'src/pipes/user/user-aggregation';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocuments>
    ) { }


    async AddUser(paylaod: CreateUserDto) {
        const hashPassword = await bcrypt.hash(paylaod.password, 10);
        const checkUser = await this.userModel.findOne({ email: paylaod.email });

        if (checkUser) {
            throw new InternalServerErrorException("This user already have");
        }

        const addUser = await this.userModel.create({
            ...paylaod,
            password: hashPassword
        });

        const [newUserDetails] = await this.userModel.aggregate([
            { $match: { _id: addUser.id } },
            ...UserCommenAggregation
        ])

        return {
            message: 'User added successfully',
            data: newUserDetails
        }
    }

    // get All users
    async getAllUser() {
        const getAllUser = await this.userModel.aggregate(UserCommenAggregation);

        return {
            message: 'Fetch the all user',
            data: getAllUser
        }
    }

    async getUserById(id: string) {
        ValidateObjectId(id);

        const [newUserDetails] = await this.userModel.aggregate([
            { $match: { _id: new Types.ObjectId(id) } },
            ...UserCommenAggregation
        ]);

        if (!newUserDetails) {
            throw new NotFoundException("User not found");
        }

        return {
            message: 'User fetch Successfully',
            data: newUserDetails
        }
    };

    async editUser(id: string, payload: CreateUserDto) {
        ValidateObjectId(id);

        const editUser = await this.userModel.findByIdAndUpdate(
            { _id: id },
            { ...payload },
            { new: true }
        )

        if (!editUser) {
            throw new NotFoundException("user Not able to update");
        }

        return {
            message: 'User updated successfully',
            data: {
                name:editUser.name,
                email:editUser.email,
                cell_no:editUser.cell_no,
                DOB:editUser.DOB,
                role:editUser.role,
            }
        }
    }

    async deleteTheUser(id: string) {

        ValidateObjectId(id);

        const getUser = await this.userModel.findByIdAndDelete({ _id: id });

        if (!getUser) {
            throw new NotFoundException("User not found");
        }

        return {
            message: 'User deleted successfully'
        }
    }
}
