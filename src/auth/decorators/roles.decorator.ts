import { SetMetadata } from '@nestjs/common';
import { Role } from '../../modules/users/enums/role.enum'; // Asegúrate de que la ruta apunte a tu enum de Roles

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);