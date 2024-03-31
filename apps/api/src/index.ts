// import App from './app';

// const main = () => {
//   // init db here

//   const app = new App();
//   app.start();
// };

// main();

import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { PORT } from './config';
import apiRouter from './router/api.router';
import prisma from './prisma';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000'], credentials: true }));
app.use(urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.use('/public', express.static('./public'));

app.listen(PORT, () => {
  console.log(`  ➜  [API] Local: http://localhost:${PORT}/`);
});

app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  const users = await prisma.user.findMany()
  res.status(200).json(users);
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});
