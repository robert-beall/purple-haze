import bodyParser from "body-parser";
import cors from 'cors';
import dotenv from "dotenv";
import express, { Express } from "express";
import { routes } from './routes';
import { initializeDB } from "./sequelize";

dotenv.config();

const app: Express = express();

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(options));

// body-parser
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const port = process.env.PORT ?? 3000;

app.use('/', routes);

app.listen(port, async () => {
  await initializeDB();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});