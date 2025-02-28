// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import dotenv from 'dotenv'
// dotenv.config()

// const authenticateauthToken = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.header("Authorization")?.split(" ")[1]; // Get token from Authorization header

//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
//     (req as any).user = decoded; // Attach decoded user to request
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Forbidden: Invalid token" });
//   }
// };

// export default authenticateauthToken;

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const secret:any = "malay";

export const authenticateauthToken = (req: any , res: any, next: NextFunction) => {

    
  const token = req.header('Authorization');

  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], secret) as any;
    
    req.user = decoded;
    console.log(decoded);
    
    next();
  } catch (error:any) {
    res.status(401).json({ message: error?.message });
  }
};