import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Min, MinLength } from "class-validator";
import { LoginEnum } from "src/enum/login/Login";

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name is string' })
    @ApiProperty({ example: 'ram' })
    name: string;

    @ApiProperty({ example: 'example@gmail.com' })
    @IsEmail()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty({example:'+91'})
    @IsString()
    @IsNotEmpty({message:'Country Code is Required'})
    @Matches(/^\+\d+$/, { message: 'Country code must start with + followed by digits' })
    country_code:string;

    @ApiProperty({ example: '987654321' })
    @IsNotEmpty({ message: 'Cell No is required' })
    @IsNumber()
    cell_no: number;

    @ApiProperty({ example: '07/08/2006' })
    @IsOptional()
    @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
        message: 'DOB must be in format dd/mm/yyyy',
    })
    DOB?: string;

    @ApiProperty({ enum: LoginEnum, default: LoginEnum.viewer })
    @IsNotEmpty({ message: 'Role is Required' })
    @IsEnum(LoginEnum, { message: `Role must be View ${Object.values(LoginEnum).join(', ')}` })
    role: LoginEnum

    @ApiProperty({ example: "Password@123" })
    @IsOptional()
    @MinLength(8, { message: 'Password must be at least 8 chars' })
    @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter' })
    @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number' })
    @Matches(/(?=.*[@$!%*?&])/,
        { message: 'Password must contain at least one special character (@$!%*?&)' })
    @IsString()
    // @Exclude()
    password: string;
}