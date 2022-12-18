import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateData = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    
    try{
        schema.parse({
            body: req.body,
            params: req.params,
            query: req.query
        });
        next();
    }catch(error){
        res.status(401).send(error);
    }
}

export default validateData;