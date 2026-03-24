import { Body, Controller, Post, Get, UseInterceptors, Query, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LoginDTO } from './dto/login.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';

@ApiTags('Login')
@Controller('/api/auth')
export class LoginController {
    constructor(private loginService: LoginService) { }

    @Post('/login')
    @ApiOperation({ summary: 'User login' })
    userLogin(@Body() userData: LoginDTO) {
        return this.loginService.userLogin(userData);
    };

    @Post('/reset-password')
    @ApiOperation({ summary: 'Reset password' })
    userResetPassword(@Body() userData: ResetPasswordDTO) {
        return this.loginService.userResetPassword(userData);
    }
};