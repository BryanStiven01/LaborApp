import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { UsersModule } from './modules/users/users.module';
import { BusinessesModule } from './modules/businesses/business.module';
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

    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT') || 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: String(configService.get<string>('DB_PASSWORD')), 
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true, 
        synchronize: true,      
      }),
    }),

    // módulos del sistema LaborApps
    AuthModule,
    UsersModule,
    JobsModule,
    BusinessesModule,
    RatingsModule,      
    NotificationsModule, 
    SectorModule, 
    MessagesModule,
    ProfilesModule,
    JobApplicationsModule,     
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}