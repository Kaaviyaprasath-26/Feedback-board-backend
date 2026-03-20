import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user/user.schema';
import { JwtStrategy } from 'src/auth/Jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: Number(configService.get<string>("EXPIRES_TIME")) || 3600 }
      }),
    }),
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }]
    ),
    JwtModule.register({
      secret:process.env.JWT_SECRET,
      signOptions:{
        expiresIn:Number(process.env.EXPIRES_TIME)
      }
    })
  ],
  providers: [LoginService,JwtStrategy],
  controllers: [LoginController]
})
export class LoginModule { }
