import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function JwtAuthGuard(type = 'jwt') {
  return applyDecorators(UseGuards(AuthGuard(type)));
}
