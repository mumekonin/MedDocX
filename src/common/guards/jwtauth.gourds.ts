import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

export function JwtAuthGuard(type: string | string[] = 'jwt') {
  return applyDecorators(UseGuards(PassportAuthGuard(type)));
}
