import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import orderRouter from './routes/order';
import userRouter from './routes/user';
import productRouter from './routes/product';
import dashboardRouter from './routes/dashboard';
import dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();
const address = '0.0.0.0:3000';
const PORT = 3000 || process.env.PORT;
const corsOptions = {
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

if (process.env.ENV === 'test') {
  app.listen(4000, function () {
    console.log(`starting tests on: 4000`);
  });
} else {
  app.listen(PORT, function () {
    console.log(`starting app on: ${address}`);
  });
}

export default app;
