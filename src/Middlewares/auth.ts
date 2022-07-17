import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function verifyAuthToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    jwt.verify(token as string, process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, Invalid token: ' + err);
  }
}
