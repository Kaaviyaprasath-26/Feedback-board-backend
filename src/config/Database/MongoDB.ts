import { ConfigService } from "@nestjs/config"
import { Connection } from "mongoose";

export const MongoDbConfig = {
    inject: [ConfigService],
    useFactory: (configServices: ConfigService) => ({
        uri: configServices.get<string>('MONGO_URI'),
        onConnectionCreate: (connection:Connection) => {
            connection.on('connected', () => {
                console.log('✅ MongoDB connected successfully');
            });

            connection.on('error', (err:Error) => {
                console.log('❌ MongoDB connection error:', err);
            });

            connection.on('disconnected', () => {
                console.log('⚠️ MongoDB disconnected');
            });

            return connection;
        },
    })
}