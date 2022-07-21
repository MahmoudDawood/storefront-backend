import { Router, Request, Response } from 'express';
import { ProductStore } from '../models/product';
import authentication from '../middlewares/authentication';

// SHOW route: 'blogs/:id' [GET]
// - Index ####
// - Show ####
// - Create [token required]
// - [OPTIONAL] Top 5 most popular products --------------------------------------
// - [OPTIONAL] Products by category (args: product category)

const store = new ProductStore();
const productRouter = Router();

const index = async (_req: Request, res: Response) => {
  if (_req.query.category) {
    await showByCategroy(_req, res);
    return;
  }
  const result = await store.index();
  res.json(result);
};
const show = async (req: Request, res: Response) => {
  const result = await store.show(parseInt(req.params.id));
  if (result === undefined) res.status(404).json('Product not found!');
  else res.json(result);
};
const create = async (req: Request, res: Response) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category
  };
  const result = await store.create(product);
  res.send(result);
};
const showByCategroy = async (req: Request, res: Response) => {
  const result = await store.showByCategory(req.query.category as string);
  res.send(result);
};

productRouter.get('/', index); // Show by category is included via query params
productRouter.get('/:id', show); // path params
productRouter.post('/', authentication, create);

export default productRouter;
