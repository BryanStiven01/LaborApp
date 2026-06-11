import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importamos ConfigService
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.modules';

// Importamos modulos
import { JobsModule } from './modules/jobs/jobs.module';
import { UsersModule } from './modules/users/users.module';
import { BusinessesModule } from './modules/businesses/business.module';

// Agregamos los módulos de soporte para cumplir con la defensa
import { RatingsModule } from './modules/ratings/ratings.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SectorModule } from './modules/sector/sector.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ProfilesModule } from './modules/users/profiles/profiles.module';
import { JobApplicationsModule } from './modules/job-applications/job-applications.module';

@Module({
  imports: [
    // Cargamos variables de entorno (.env) de forma global
    ConfigModule.forRoot({ isGlobal: true }),

    // Usamos forRootAsync para esperar a que las variables carguen primero
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME'),
        // Aquí forzamos la conversión a String asegurando que el dato ya exista
        password: String(configService.get<string>('DB_PASSWORD')), 
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true, 
        synchronize: true,      
      }),
    }),

    // Registramos todos los módulos del sistema LaborApps
    AuthModule,
    UsersModule,
    JobsModule,
    BusinessesModule,
    RatingsModule,      // <-- Agregado para el sistema de reputación
    NotificationsModule, 
    SectorModule, 
    MessagesModule,
    ProfilesModule,
    JobApplicationsModule,     // <-- Agregado para el sistema de alertas
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}