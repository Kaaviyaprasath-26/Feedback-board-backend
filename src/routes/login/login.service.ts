import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from "bcrypt";
import { Model } from 'mongoose';
import { User, UserDocuments } from 'src/schema/user/user.schema';
import {  UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocuments>,
        private readonly jwtService: JwtService
    ) { }

    async userLogin(userData:LoginDTO){
        
        const checkUserDetails = await this.userModel.findOne({email:userData.userName});

        if(!checkUserDetails) {
            throw new UnauthorizedException("User name or password is worng...")
        }

        const isPasswordValid = await bcrypt.compare(userData.password, checkUserDetails.password);
        console.log('isPasswordValid',isPasswordValid);

        if(!isPasswordValid){
            throw new UnauthorizedException("Invalide password or userName")
        }

        const payload = {
            userId: checkUserDetails?._id,
            email:checkUserDetails?.email
        }
        const accessToken = this.jwtService.sign(payload);

        return{
            message:'User login successfully',
            accessToken
        }
    }

};