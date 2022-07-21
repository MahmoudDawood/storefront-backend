import { Router, Request, Response } from 'express';
import { ProductStore } from '../models/product';
import authentication from '../middlewares/authentication';

const store = new ProductStore();
const productRouter = Router();

const index = async (_req: Request, res: Response) => {
  try {
    if (_req.query.category) {
      await showByCategroy(_req, res);
      return;
    }
    const result = await store.index();
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(`Couldn't complete GET request to /products. Error: {err}`);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(parseInt(req.params.id));
    if (result === undefined) res.status(404).json('Product not found!');
    else res.json(result);
  } catch (err) {
    res.status(400);
    res.json(`Couldn't complete GET request to /orders/:id. Error: {err}`);
  }
};

const create = async (req: Request, res: Response) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };
  try {
    const result = await store.create(product);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(`Couldn't complete POST request to /orders. Error: {err}`);
  }
};

const showByCategroy = async (req: Request, res: Response) => {
  try {
    const result = await store.showByCategory(req.query.category as string);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(`Couldn't complete GET request to /orders. Error: {err}`);
  }
};

productRouter.get('/', index); // Show by category is included via query params
productRouter.get('/:id', show); // path params
productRouter.post('/', authentication, create);

export default productRouter;
