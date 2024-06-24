import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
    user?: {userId: number, role: string};
}

interface JwtPayload {
    userId: number;
    role:string;
}

export const authenticateToken = (req: AuthRequest,res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_TOKEN as string, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user as JwtPayload;
        next();
    });

}