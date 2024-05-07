import { rejects } from "assert";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const createToken = (id:string, email:string, expiresIn) => {

    const payload = { id, email}; 
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn:expiresIn
    }); 
    return token; 
}


// export const verifyToken = async (req:Request, res:Response, next:NextFunction) => {
//      const  token = req.signedCookies['auth_cookie']; 
//      if(!token || token.trim() === "" )
//         {
//             return res.status(401).json({ message : "Token not received!!"})
//         }

//         return new Promise<void>( (resolve, reject ) => {
//             return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
//                 if(err)
//                     {
//                         reject(err.message);
//                     }else {
//                         console.log("Token has verified.")
//                         resolve(); 
//                         res.locals.jwtData = success; 
//                         return next(); 
//                     }
//             })
//         })
// }