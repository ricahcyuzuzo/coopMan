import express from 'express';
import { getTransactions, getUsers } from '../controllers/admin';
const routes = express();

routes.get('/admin/users', getUsers);
routes.get('/admin/transactions', getTransactions);

export default routes;
