import * as jwt from 'jsonwebtoken';

export class CommonUtils {
  static generateJwtToken(jwtData: { id: string; email: string }): string {
    return jwt.sign(jwtData, process.env.JWT_SECRET as string);
  }
}
