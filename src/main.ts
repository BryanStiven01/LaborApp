import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ACTIVAR VALIDACIÓN GLOBAL: Obliga a que todas las peticiones cumplan con las reglas de los DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            
    forbidNonWhitelisted: true, 
    transform: true,            
  }));

  const config = new DocumentBuilder()
    .setTitle('LaborApps API')
    .setDescription('Documentación de la plataforma para conectar empleadores y trabajadores.')
    .setVersion('1.0')
    .addBearerAuth() // <--- ¡ESTA ES LA LÍNEA MÁGICA QUE AGREGAMOS!
    .addTag('Users')
    .addTag('Jobs')
    .addTag('Businesses')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3000);
  console.log(`Servidor corriendo en: http://localhost:3000/api/docs`);
}
bootstrap();