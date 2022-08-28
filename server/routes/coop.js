import express from 'express';
import { addProduce, getProduce, getTotalCategory, registerWasted, sellProduce } from '../controllers/coop';
const routes = express();

routes.post('/coop/add_produce', addProduce);
routes.post('/coop/sell_produce', sellProduce);
routes.get('/coop/produce', getProduce);
routes.post('/coop/add_wasted', registerWasted);
routes.get('/coop/trans', getTotalCategory);


export default routes;
