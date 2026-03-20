import {
    Body, Controller, Post, Get, UseInterceptors, 
    Query, Put, Delete, Param,
    UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

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
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Get All the users' })
    @UseInterceptors(CacheInterceptor)
    @UseGuards(AuthGuard('jwt'))
    getAllUser() {
        return this.userService.getAllUser();
    };

    @Get(':id')
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Get User By Id' })
    getUserById(@Param() id: string) {
        return this.userService.getUserById(id);
    };

    @Put('/edit/:id')
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Update user Details' })
    editUser(@Query() id: string, @Body() userDetails: CreateUserDto) {
        return this.userService.editUser(id, userDetails);
    };

    @Delete('/delete/:id')
    @ApiBearerAuth('jwt')
    @ApiOperation({ summary: 'Delete the user' })
    deleteUser(@Query() id: string) {
        return this.userService.deleteTheUser(id);
    };
}