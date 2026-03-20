import { Body, Controller, Post, Get, UseInterceptors, Query, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LoginDTO } from './dto/login.dto';

@ApiTags('Login')
@Controller('/api/login')
export class LoginController {
    constructor(private loginService: LoginService){}

    @Post()
    @ApiOperation({summary:'user login'})
    userLogin(@Body() userData:LoginDTO){
        return this.loginService.userLogin(userData);
    };
};