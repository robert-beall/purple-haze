import dotenv from "dotenv";
import express, { Express } from "express";
import { routes } from './routes';
import bodyParser from "body-parser";

dotenv.config();

const app: Express = express();

// body-parser
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const port = process.env.PORT ?? 3000;

app.use('/', routes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});