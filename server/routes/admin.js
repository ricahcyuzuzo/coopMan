import express from 'express';
import { getUsers } from '../controllers/admin';
const routes = express();

routes.get('/admin/users', getUsers);

export default routes;
