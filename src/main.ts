import { NestFactory } from '@nestjs/core';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { logger } from './config/logger/Logger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger/Swagger';
import { CommonResInterceptor } from './interceptors/commonRes.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  const configservice = app.get(ConfigService);
  const appPort = configservice.get<number>("PORT") ?? 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // remove extra fields automatically
      forbidNonWhitelisted: true, // throw error for unknown fields
      transform: true,       // automatically transform payload types
    }),
  );
  app.enableCors({
    origin: configservice.get<string>("FRONTEND_URL") || "http://localhost:5173",
  });

   app.useGlobalInterceptors(
    new CommonResInterceptor(),
  );

  //Swagger
  const document = SwaggerModule.createDocument(app, SwaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(appPort);
}
bootstrap();