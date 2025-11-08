import * as jwt from 'jsonwebtoken';
import env from '../environment/env';

export class JWTUtil {
  private secretKey: string;

  constructor() {
    this.secretKey = env.JWT_SECRET;
  }

  createJWT(payload: any, expiresIn: string | number = '48h'): string {
    return jwt.sign(payload, this.secretKey, { expiresIn });
  }

  decodeJwt(token: string): any {

      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
  }
}

const jwtUtil = new JWTUtil();
export default jwtUtil;