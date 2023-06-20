import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // borrar los campos que no estén en el DTO
      forbidNonWhitelisted: true, // si hay campos no permitidos, lanzar error
      transform: true, // transformar los datos a los tipos especificados en el DTO
    }),
  );
  await app.listen(3000);
}

bootstrap();
