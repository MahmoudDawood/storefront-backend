import { Router, Request, Response } from 'express';
import { ProductStore } from '../Models/product';

// SHOW route: 'blogs/:id' [GET]
// - Index ####
// - Show ####
// - Create [token required]
// - [OPTIONAL] Top 5 most popular products --------------------------------------
// - [OPTIONAL] Products by category (args: product category) #######

const store = new ProductStore();
const productRouter = Router();

const index = async (_req: Request, res: Response) => {
  const result = await store.index();
  res.send(result);
};
const showByCategroy = async (_req: Request, res: Response) => {
  const result = await store.showByCategory(_req.params.category);
  res.send(result);
};
const show = async (_req: Request, res: Response) => {
  const result = await store.show(parseInt(_req.params.id));
  res.send(result);
};
const create = async (_req: Request, res: Response) => {
  const product = {
    name: _req.body.name,
    price: _req.body.price,
    category: _req.body.category
  };
  const result = await store.create(product);
  res.send(result);
};

productRouter.get('/', index);
productRouter.get('/category/:category', showByCategroy);
productRouter.get('/:id', show);
productRouter.post('/', create);

export default productRouter;
