import express from 'express';
import { defaultRoute } from './defaultRoute';
import { helloWorldRoute } from './helloWorldRoute';
import { authRoute } from './authRoute';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(helloWorldRoute);
routes.use(authRoute);