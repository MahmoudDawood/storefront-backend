import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import orderRouter from './routes/order';
import userRouter from './routes/user';
import productRouter from './routes/product';
import dashboardRouter from './routes/dashboard';

const app: express.Application = express();
const address = '0.0.0.0:3000';
const corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/', dashboardRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
