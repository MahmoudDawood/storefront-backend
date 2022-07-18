import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function (
  req: Request,
  res: Response,
  next: NextFunction
): void {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    const payload = jwt.verify(
      token as string,
      process.env.TOKEN_SECRET as string
    ) as JwtPayload;
    const userId = payload.user.id;
    if (userId !== +req.params.id) {
      throw new Error('User id does not match!');
    }
    next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, Invalid token: ' + err);
  }
}
