import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; // <-- Herramienta de validación global

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ACTIVAR VALIDACIÓN GLOBAL: Obliga a que todas las peticiones cumplan con las reglas de los DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // Remueve propiedades que no estén explícitamente en el DTO
    forbidNonWhitelisted: true, // Lanza un error si mandan campos de más en el JSON
    transform: true,            // Convierte tipos automáticamente si el DTO lo requiere
  }));

const config = new DocumentBuilder()
    .setTitle('LaborApps API')
    .setDescription('Documentación de la plataforma para conectar empleadores y trabajadores.')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Profiles')
    .addTag('Jobs')
    .addTag('Job Applications')
    .addTag('Businesses')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`Servidor corriendo en: http://localhost:3000/api/docs`);
}
bootstrap();