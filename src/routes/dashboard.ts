import { Router, Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';
import authenctication from '../middlewares/authentication';

const dashboardRouter = Router();
const dashboard = new DashboardQueries();

const fiveMostExpensiveProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await dashboard.fiveMostExpensiveProducts();
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(`Couldn't complete GET request to /five-most-expensive-products`);
  }
};

const fiveMostPopularProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await dashboard.fiveMostPopularProducts();
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(
      `Couldn't complete GET request to /five-most-popular-products. Error: {err}`
    );
  }
};

const usersWithOrders = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await dashboard.usersWithOrders();
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(
      `Couldn't complete GET request to /users-with-orders. Error: {err}`
    );
  }
};

const userCompletedOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await dashboard.userCompletedOrders(parseInt(req.params.id));
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(
      `Couldn't complete GET request to /user-completed-orders/:id. Error: {err}`
    );
  }
};

const productsInOrders = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await dashboard.productsInOrders();
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(
      `Couldn't complete GET request to /products-in-orders. Error: {err}`
    );
  }
};

dashboardRouter.get('/five-most-expensive-products', fiveMostExpensiveProducts);
dashboardRouter.get('/five-most-popular-products', fiveMostPopularProducts);
dashboardRouter.get('/users-with-orders', authenctication, usersWithOrders);
dashboardRouter.get(
  '/user-completed-orders/:id',
  authenctication,
  userCompletedOrders
);
dashboardRouter.get('/products-in-orders', authenctication, productsInOrders);

export default dashboardRouter;
