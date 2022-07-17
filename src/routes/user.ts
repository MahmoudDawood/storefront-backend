import { UserStore } from '../Models/user';
import { Router, Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import auth from '../Middlewares/auth';
import dotenv from 'dotenv';
dotenv.config();

// #### Users
// - Index [token required]
// - Show [token required]
// - Create N[token required] -----------

const userRouter = Router();
const store = new UserStore();

function verifyAuthToken(
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

function verifyAuthorization(
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

const index = async (_req: Request, res: Response): Promise<void> => {
  const result = await store.index();
  res.send(result);
};

const show = async (req: Request, res: Response): Promise<void> => {
  const result = await store.show(parseInt(req.params.id));
  res.send(result);
};

const create = async (req: Request, res: Response): Promise<void> => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  };
  try {
    const result = await store.create(user);
    const token = jwt.sign(
      { user: result },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// const authenticate = async (_req: Request, res: Response): Promise<void> => {
//   const username = _req.body.username;
//   const password = _req.body.password;
//   try {
//     const result = await store.authenticate(username, password);
//     const token = jwt.sign(
//       { user: result },
//       process.env.TOKEN_SECRET as string
//     );
//     if (result === null) res.status(400).json('User not found.');
//     else res.status(200).json(token);
//   } catch (err) {
//     res.status(401).json(`User Authentication Failed: ${err}`);
//   }
// };

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await store.delete(parseInt(req.params.id));
    res.json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};

userRouter.get('/', auth, index);
userRouter.get('/:id', auth, verifyAuthorization, show);
userRouter.post('/', create);
// userRouter.post('/authenticate', authenticate);
userRouter.delete('/:id', auth, verifyAuthorization, deleteUser);

export default userRouter;
