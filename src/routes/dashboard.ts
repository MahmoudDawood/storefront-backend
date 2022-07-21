import { Router, Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';
import authenctication from '../middlewares/authentication';

const dashboardRouter = Router();
const dashboard = new DashboardQueries();

const fiveMostExpensiveProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const result = await dashboard.fiveMostExpensiveProducts();
  res.json(result);
};

const fiveMostPopularProducts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const result = await dashboard.fiveMostPopularProducts();
  res.json(result);
};

const usersWithOrders = async (_req: Request, res: Response): Promise<void> => {
  const result = await dashboard.usersWithOrders();
  res.json(result);
};

const userCompletedOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await dashboard.userCompletedOrders(parseInt(req.params.id));
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
dashboardRouter.get('/five-most-popular-products', fiveMostPopularProducts);
dashboardRouter.get('/users-with-orders', authenctication, usersWithOrders);
dashboardRouter.get('/user-completed-orders/:id', userCompletedOrders);
dashboardRouter.get('/products-in-orders', productsInOrders);

export default dashboardRouter;
