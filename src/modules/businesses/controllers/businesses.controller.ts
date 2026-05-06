import { Controller } from '@nestjs/common';

// 1. Cambiamos la ruta para que tu API responda en /businesses
@Controller('businesses') 
// 2. Cambiamos el nombre de la clase para que el Módulo la encuentre
export class BusinessesController {}