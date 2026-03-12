import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedbackModule } from './feedback/feedback.module';
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose';
import { Feedback, FeedbackSchema } from './schema/feedback.schema';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configServices: ConfigService) => ({
        uri: configServices.get<string>('MONGO_URI'),
        onConnectionCreate: (connection) => {
          connection.on('connected', () => {
            console.log('✅ MongoDB connected successfully');
          });

          connection.on('error', (err) => {
            console.log('❌ MongoDB connection error:', err);
          });

          connection.on('disconnected', () => {
            console.log('⚠️ MongoDB disconnected');
          });

          return connection;
        },
      })
    }),
    FeedbackModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
