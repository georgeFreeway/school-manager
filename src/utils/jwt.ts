import jwt from 'jsonwebtoken';
import config from 'config';

export const signJwt = (payload: object, secretString: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey', options?: jwt.SignOptions): string => {
    const privateKey = config.get<string>(secretString);

    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    });
}

export function verifyJwt<T>(token: string, secretString: 'accessTokenPublicKey' | 'refreshTokenPublicKey'): T | null{
    const publicKey = config.get<string>(secretString);

    try{
        const decodedToken = jwt.verify(token, publicKey) as T;
        return decodedToken;
    }catch(error){
        return null;
    }
}