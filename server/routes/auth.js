import express from 'express';
import { createAccount, Login } from '../controllers/auth';
const routes = express();

routes.post('/auth/user', createAccount);
routes.post('/auth/login', Login);

export default routes;
  