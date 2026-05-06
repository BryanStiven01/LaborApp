import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// 1. Importamos tus nuevos módulos con las rutas correctas
import { JobsModule } from './modules/jobs/jobs.module';
import { UsersModule } from './modules/users/users.module';
import { BusinessesModule } from './modules/businesses/business.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    // 2. Registramos los módulos para que NestJS los reconozca
    JobsModule,
    UsersModule,
    BusinessesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}