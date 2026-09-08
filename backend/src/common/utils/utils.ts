import * as jwt from 'jsonwebtoken';
import type { CookieOptions } from 'express';

export class CommonUtils {
  static generateJwtToken(jwtData: { id: string; email: string }): string {
    return jwt.sign(jwtData, process.env.JWT_SECRET as string, { expiresIn: '7d' });
  }

  static authCookieOptions(): CookieOptions {
    const isProd = process.env.NODE_ENV === 'production';
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }
}
