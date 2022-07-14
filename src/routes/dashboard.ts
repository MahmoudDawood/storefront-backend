import { Router, Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';

const dashboardRouter = Router();
const dashboard = new DashboardQueries();

const fiveMostExpensiveProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const result = await dashboard.fiveMostExpensiveProducts();
  res.json(result);
};

const usersWithOrders = async (_req: Request, res: Response): Promise<void> => {
  const result = await dashboard.usersWithOrders();
  res.json(result);
};

const productsInOrders = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const result = await dashboard.productsInOrders();
  res.json(result);
};

dashboardRouter.get('/five-most-expensive-products', fiveMostExpensiveProducts);
dashboardRouter.get('/users-with-orders', usersWithOrders);
dashboardRouter.get('/products-in-orders', productsInOrders);

export default dashboardRouter;
