import { OrderStore } from '../Models/order';
import { Router, Request, Response } from 'express';

const orderRouter = Router();
const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const result = await store.index();
  res.send(result);
};

const show = async (_req: Request, res: Response) => {
  const result = await store.ordersByUser(parseInt(_req.params.id));
  res.send(result);
};

const create = async (_req: Request, res: Response) => {
  const order = {
    status: _req.body.status,
    user_id: _req.body.userId
  };
  const result = await store.create(order);
  res.send(result);
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: number = parseInt(_req.params.id);
  const productId: number = _req.body.productId;
  const quantity: number = _req.body.quantity;
  try {
    const result = await store.addProduct(quantity, orderId, productId);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

orderRouter.get('/', index);
orderRouter.get('/:id', show);
orderRouter.post('/', create);
orderRouter.post('/:id/products', addProduct);

export default orderRouter;
