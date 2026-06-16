import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  // Registramos la entidad User para que TypeORM cree tu tabla 'users'
  imports: [TypeOrmModule.forFeature([User]), ProfilesModule],
  controllers: [UsersController],
  providers: [UsersService],
  
  // Exportamos el servicio por si otro módulo necesita buscar usuarios
  exports: [UsersService, TypeOrmModule], // <-- Exportamos también el módulo de TypeORM para que otros módulos puedan usar el repositorio d

  
  
})

export class UsersModule {}