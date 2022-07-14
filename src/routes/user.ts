import { UserStore } from '../Models/user';
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userRouter = Router();
const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const result = await store.index();
  res.send(result);
};

const show = async (_req: Request, res: Response) => {
  const result = await store.show(parseInt(_req.params.id));
  res.send(result);
};

const create = async (_req: Request, res: Response) => {
  const user = {
    name: _req.body.name,
    phone: _req.body.phone,
    address: _req.body.address,
    username: _req.body.username,
    password_digest: _req.body.password
  };
  try {
    const result = await store.create(user);
    const token = jwt.sign(
      { user: result },
      process.env.TOKEN_SECRET as string
    );
    // console.log(token);
    res.json(token);
  } catch (err) {
    res.status(401);
    res.send(err);
  }
};

const authenticate = async (_req: Request, res: Response) => {
  const username = _req.body.username;
  const password = _req.body.password;
  const result = await store.authenticate(username, password);
  result === null ? res.status(400) : res.status(200);
  res.send(result);
};

const deleteUser = async (_req: Request, res: Response) => {
  try {
    const token = _req.headers.authorization?.split(' ')[1];
    if (jwt.verify(token as string, process.env.TOKEN_SECRET as string)) {
      const result = await store.delete(parseInt(_req.params.id));
      if (result) res.json(result);
      /////////////// FINISH CHECKBOX 3, FIXING STATUS CODES & ERROR HANDLING ///////////////
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

userRouter.get('/', index);
userRouter.get('/:id', show);
userRouter.post('/', create);
userRouter.post('/authenticate', authenticate);
userRouter.delete('/:id', deleteUser);

export default userRouter;
