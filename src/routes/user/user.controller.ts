import {
    Body, Controller, Post, Get, UseInterceptors,
    Put, Delete, Param,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UserService } from './user.service';
import { JwtAuth } from 'src/common/decorators/jwt-auth.decorators';

@ApiTags('Users')
@Controller('/api/user')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/add')
    @ApiOperation({ summary: 'Add New User' })
    AddUser(@Body() userData: CreateUserDto) {
        console.log('check this');
        return this.userService.AddUser(userData);
    };

    @Get('/list')
    @UseInterceptors(CacheInterceptor)
    @JwtAuth("Get All the users")
    getAllUser() {
        return this.userService.getAllUser();
    };

    @Get(':id')
    @JwtAuth("Get User By Id")
    getUserById(@Param('id') id: string) {
        return this.userService.getUserById(id);
    };

    @Put('/edit/:id')
    @JwtAuth("Update user Details")
    editUser(@Param('id') id: string, @Body() userDetails: CreateUserDto) {
        return this.userService.editUser(id, userDetails);
    };

    @Delete('/delete/:id')
    @JwtAuth("Delete the user")
    deleteUser(@Param() id: string) {
        return this.userService.deleteTheUser(id);
    };
}