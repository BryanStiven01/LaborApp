import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../modules/users/users.module'; // <-- Verifica esta ruta exacta en tu proyecto

@Module({
  imports: [
    UsersModule 
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}