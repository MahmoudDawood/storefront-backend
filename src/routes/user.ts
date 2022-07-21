import { UserStore } from '../models/user';
import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authentication from '../middlewares/authentication';
// import authorization from '../Middlewares/authorization';
import dotenv from 'dotenv';
dotenv.config();

const userRouter = Router();
const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await store.index();
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(`Couldn't complete GET request to /users. Error: {err}`);
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await store.show(parseInt(req.params.id));
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(`Couldn't complete GET request to /users/:id. Error: {err}`);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
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
    res.json(`Couldn't complete POST request to /users. Error: {err}`);
  }
};

// const authenticate = async (req: Request, res: Response): Promise<void> => {
//   const username = req.body.username;
//   const password = req.body.password;
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

// const deleteUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const result = await store.delete(parseInt(req.params.id));
//     res.json(result);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

userRouter.get('/', authentication, index);
userRouter.get('/:id', authentication, show);
userRouter.post('/', create);
// userRouter.post('/authenticate', authenticate);
// userRouter.delete('/:id', authentication, authorization, deleteUser);

export default userRouter;
