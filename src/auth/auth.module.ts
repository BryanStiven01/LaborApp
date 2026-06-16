import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; 
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../modules/users/users.module'; 
// ELIMINA EL IMPORT DE 'User' DESDE ENTITIES/USER.ENTITY AQUÍ

@Module({
  imports: [
    // 1. YA NO NECESITAS forFeature([User]) AQUÍ porque UsersModule ya lo hace.
    // Al hacerlo aquí, estás duplicando la definición y causando conflicto.
    
    // 2. Importar UsersModule es suficiente para que Auth tenga acceso a todo.
    UsersModule, 
    
    JwtModule.register({
      secret: 'MiLlaveSuperSecreta123', 
      signOptions: { expiresIn: '2h' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy, JwtModule], 
})
export class AuthModule {}