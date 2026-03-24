import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, Matches } from "class-validator";

export class ResetPasswordDTO {
    @IsNotEmpty({ message: 'Email is required' })
    @IsString({ message: 'Email must be string' })
    @ApiProperty({ example: 'exmaple@gmail.com' })
    @IsEmail()
    userName: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be string' })
    @ApiProperty({ example: 'Password3431@' })
    currentpassword: string;


    @IsOptional()
    @IsString({ message: 'password must be string' })
    @ApiProperty({ example: 'New password' })
    @MinLength(8, { message: 'Password must be at least 8 chars' })
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
    @Matches(/(?=.*[@$!%*?&])/,
        { message: 'Password must contain at least one special character (@$!%*?&)' })
    newPassword: string;

    @IsOptional()
    @IsString({ message: 'confirm password must be string' })
    @ApiProperty({ example: 're-enter the password' })
    @MinLength(8, { message: 'Password must be at least 8 chars' })
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
    @Matches(/(?=.*[@$!%*?&])/,
        { message: 'Password must contain at least one special character (@$!%*?&)' })
    confirmPassword: string;
}