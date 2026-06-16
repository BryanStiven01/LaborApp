import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Nota para la defensa: En producción, esta llave debe venir de un archivo .env
      secretOrKey: 'MiLlaveSuperSecreta123', 
    });
  }


  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload; // Extraemos el ID numérico del token
    const user = await this.userRepository.findOneBy({ id });

    // Si el ID del token no existe en la base de datos (ej. usuario eliminado)
    if (!user) throw new UnauthorizedException('Token no válido.');

    /* NOTA: Esta validación está comentada porque tu tabla Users en el PDF 
      no tiene el campo 'is_active'. 
      Si en el futuro quieres poder "banear" usuarios, se descomenta esto y 
      se le agrega la columna a la base de datos.
    */
    // if (!user.is_active) throw new UnauthorizedException('El usuario está inactivo.');

    // Si todo sale bien, retornamos el usuario completo
    return user;
  }
}