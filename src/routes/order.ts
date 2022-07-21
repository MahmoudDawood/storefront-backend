import { OrderStore } from '../models/order';
import { Router, Request, Response } from 'express';
import authentication from '../middlewares/authentication';

const orderRouter = Router();
const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(`Couldn't complete GET request to /orders. Error: {err}`);
  }
};

const showOrdersByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await store.ordersByUser(parseInt(req.params.id));
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(`Couldn't complete GET request to /orders:id. Error: {err}`);
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  const order = {
    status: req.body.status,
    user_id: req.body.userId
  };
  try {
    const result = await store.create(order);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(`Couldn't complete POST request to /orders. Error: {err}`);
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const orderId: number = parseInt(req.params.id);
  const productId: number = req.body.productId;
  const quantity: number = req.body.quantity;
  try {
    const result = await store.addProduct(quantity, orderId, productId);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(
      `Couldn't complete POST request to /orders/:id/products. Error: {err}`
    );
  }
};

orderRouter.get('/', index);
orderRouter.get('/:id', authentication, showOrdersByUser); // id param: user_id column
orderRouter.post('/', authentication, create);
orderRouter.post('/:id/products', authentication, addProduct);

export default orderRouter;
