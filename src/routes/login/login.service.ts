import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocuments } from 'src/schema/user/user.schema';
import { LoginDTO } from './dto/login.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { BcryptPasswordCompare, BcryptPasswordHash } from 'src/utils/Bcrypt-password.util';

@Injectable()
export class LoginService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocuments>,
        private readonly jwtService: JwtService
    ) { }

    async userLogin(userData: LoginDTO) {

        const checkUserDetails = await this.userModel.findOne({ email: userData.userName });

        if (!checkUserDetails) {
            throw new BadRequestException("User name or password is worng...")
        }

        // const isPasswordValid = await bcrypt.compare(userData.password, checkUserDetails.password);
        const isPasswordValid = await BcryptPasswordCompare(userData.password, checkUserDetails.password);

        if (!isPasswordValid) {
            throw new BadRequestException("Invalide password or userName")
        }

        const payload = {
            userId: checkUserDetails?._id,
            email: checkUserDetails?.email
        }
        const accessToken = this.jwtService.sign(payload);

        return {
            message: 'User login successfully',
            data:{
                accessToken
            }
        }
    }

    async userResetPassword(userData: ResetPasswordDTO) {
        const { userName, currentpassword, newPassword, confirmPassword } = userData;

        // find the user
        const findUser = await this.userModel.findOne({ email: userName });

        if (!findUser) {
            throw new BadRequestException("Invalid userName, check again");
        }

        const isPasswordValid = await BcryptPasswordCompare(currentpassword, findUser?.password);

        if (!isPasswordValid) {
            throw new BadRequestException("Invalid password, try again...");
        }

        if (currentpassword !== newPassword) {
            throw new BadRequestException("Current Password and New password not be same...")
        }

        if (newPassword !== confirmPassword) {
            throw new BadRequestException("New password does not match confirm password");
        }

        const hashPassword = await BcryptPasswordHash(newPassword);
        await this.userModel.findByIdAndUpdate(
            { _id: findUser?._id },
            { password: hashPassword },
            { new: true }
        );

        return {
            message: 'Password updated successfully',
        }

    };

};