import express from 'express';
import { defaultRoute } from './defaultRoute';
import { helloWorldRoute } from './helloWorldRoute';
import { authRoute } from './authRoute';
import { dbTestRoute } from './dbTestRoute';
import { items } from './ItemRoute';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(helloWorldRoute);
routes.use(authRoute);
routes.use(dbTestRoute);
routes.use(items);