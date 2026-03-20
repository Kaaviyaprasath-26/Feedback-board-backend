import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/schema/user/user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: User.name, schema: UserSchema }]
    ),
  ],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule { }
