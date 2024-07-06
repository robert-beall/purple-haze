import express from 'express';
import { defaultRoute } from './defaultRoute';
import { helloWorldRoute } from './helloWorldRoute';

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(helloWorldRoute);