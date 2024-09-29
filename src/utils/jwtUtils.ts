import jwt, { JwtPayload } from "jsonwebtoken";
import { configs } from "../configs";

export class JWTUtils {
    static generateToken(payload: object): string {
        return jwt.sign(payload, configs.jwt.secretKey, { expiresIn: configs.jwt.expiresIn });
    }

    static verifyToken(token: string, callback: (err: jwt.VerifyErrors | null, decoded?: string | jwt.JwtPayload | undefined) => void) {
        jwt.verify(token, configs.jwt.secretKey, (err, decode) => {
            callback(err, decode);
        })
    }
}