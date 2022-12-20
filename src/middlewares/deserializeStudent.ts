import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt";

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {

    const token = (req.headers.authorization || "").replace(/^Bearer\s/, "");

    if(!token){
        return next();
    }

    const decodedToken = verifyJwt(token, 'accessTokenPublicKey');

    if(decodedToken){
        res.locals.user = decodedToken;
        
    }

    next();
}