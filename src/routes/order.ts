import { OrderStore } from '../models/order';
import { Router, Request, Response } from 'express';

const orderRouter = Router();
const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  const result = await store.index();
  res.json(result);
};

const showOrdersByUser = async (req: Request, res: Response): Promise<void> => {
  const result = await store.ordersByUser(parseInt(req.params.id));
  res.json(result);
};

const create = async (req: Request, res: Response): Promise<void> => {
  const order = {
    status: req.body.status,
    user_id: req.body.userId
  };
  const result = await store.create(order);
  res.json(result);
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
    res.json(err);
  }
};

orderRouter.get('/', index);
orderRouter.get('/:id', showOrdersByUser); // id param: user_id column
orderRouter.post('/', create);
orderRouter.post('/:id/products', addProduct);

export default orderRouter;
