import express from 'express';
import { addProduce, getProduce, sellProduce } from '../controllers/coop';
const routes = express();

routes.post('/coop/add_produce', addProduce);
routes.post('/coop/sell_produce', sellProduce);
routes.get('/coop/produce', getProduce);

export default routes;
