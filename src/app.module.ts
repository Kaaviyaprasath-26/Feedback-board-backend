import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './routes/feedback/feedback.module';
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDbConfig } from "./config/Database/MongoDB";
import { LoginModule } from './routes/login/login.module';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    //Cacheing 
    CacheModule.register({
      isGlobal: true,
      ttl: Number(process.env.TTL) || 3600000,
      max: Number(process.env.MAX_CACHE_COUNT) || 100
    }),

    MongooseModule.forRootAsync(MongoDbConfig),
    FeedbackModule,
    LoginModule, 
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
