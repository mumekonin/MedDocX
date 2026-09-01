import * as jwt from 'jsonwebtoken'
export class CommonUtils{
  static generateJwtToken(jwtData){
    return jwt.sign(jwtData, process.env.JWT_SECRET!)
  }
}



