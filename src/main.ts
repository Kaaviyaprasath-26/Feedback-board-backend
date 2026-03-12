import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // remove extra fields automatically
      forbidNonWhitelisted: true, // throw error for unknown fields
      transform: true,       // automatically transform payload types
    }),
  );
  app.enableCors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
