import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

// 1. Importamos modulos
import { JobsModule } from './modules/jobs/jobs.module';
import { UsersModule } from './modules/users/users.module';
import { BusinessesModule } from './modules/businesses/business.module';

// 2. IMPORTANTE: Agregamos los módulos de soporte para cumplir con la defensa
import { RatingsModule } from './modules/ratings/ratings.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SectorModule } from './modules/sector/sector.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    // Cargamos variables de entorno (.env) de forma global
    ConfigModule.forRoot({ isGlobal: true }),

    // Configuración de conexión a PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true, // Esto cargará automáticamente las nuevas tablas (Profiles, Applications, etc.)
      synchronize: true,      // Sincroniza tu código con la DB en tiempo real
    }),
    
   

    // Registramos todos los módulos del sistema LaborApps
    AuthModule,
    UsersModule,
    JobsModule,
    BusinessesModule,
    RatingsModule,      // <-- Agregado para el sistema de reputación
    NotificationsModule, SectorModule, MessagesModule, // <-- Agregado para el sistema de alertas
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

