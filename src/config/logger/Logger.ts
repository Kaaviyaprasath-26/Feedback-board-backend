import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import "winston-daily-rotate-file";

export const logger = WinstonModule.createLogger({
    transports:[
        // Conosle log
        new winston.transports.Console({
            format:winston.format.combine(
                winston.format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                winston.format.colorize(),
                winston.format.printf(({timestamp, level, message, context})=>{
                    return `[${timestamp}] [${level}] ${context ? '[' + context + '] ' : ''}${message}`;
                })
            )
        }),

        // Daily file logs
        new winston.transports.DailyRotateFile({
            filename:'logs/%DATE%-app.log',
            datePattern:'YYYY-MM-DD',
            zippedArchive:true, // comparess old log files
            maxSize:'20m',
            maxFiles:'14d',
            format:winston.format.combine(
                winston.format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
                winston.format.printf(({timestamp, level, message, context})=>{
                    return `[${timestamp}] [${level}] ${context ? '[' + context + '] ' : ''}${message}`;
                })
            )
        })
    ]
});