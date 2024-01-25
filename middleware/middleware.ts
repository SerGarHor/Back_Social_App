import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET_KEY || 'defaultSecret';

export class middleware {

    static verifyToken(req: any, res: any){
        if (!req.headers.authorization) return res.status(401).json('No autorizado')
        const token = req.headers.authorization.substr(7) 
        if (token != ''){
            const content = jwt.verify(token,secretKey)
        } else {
            res.status(401).json('Token vacio')
        }
    }
}

