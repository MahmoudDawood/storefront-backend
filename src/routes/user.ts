import { UserStore } from '../Models/user';
import { Router, Request, Response } from 'express';

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
    address: _req.body.address
  };
  const result = await store.create(user);
  res.send(result);
};

userRouter.get('/', index);
userRouter.get('/:id', show);
userRouter.post('/', create);

export default userRouter;
