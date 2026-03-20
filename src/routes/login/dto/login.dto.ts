import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDTO {
    @IsNotEmpty({message:'Email is required'})
    @IsString({message:'Email must be string'})
    @ApiProperty({example:'exmaple@gmail.com'})
    @IsEmail()
    userName:string;

    @IsNotEmpty({message:'Password is required'})
    @IsString({message:'Password must be string'})
    @ApiProperty({example:'Password3431@'})
    password:string;
}