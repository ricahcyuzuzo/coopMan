import express from 'express';
import { addProduce, deleteProduce, deleteSoldAndWasted, getProduce, getTotalCategory, registerWasted, sellProduce, updateProduce, updateSoldAndWasted } from '../controllers/coop';
const routes = express();

routes.post('/coop/add_produce', addProduce);
routes.post('/coop/sell_produce', sellProduce);
routes.get('/coop/produce', getProduce);
routes.post('/coop/add_wasted', registerWasted);
routes.get('/coop/trans', getTotalCategory);
routes.delete('/coop/delete_produce', deleteProduce);
routes.patch('/coop/update_produce', updateProduce);
routes.delete('/coop/delete_transaction', deleteSoldAndWasted);
routes.patch('/coop/update_transaction', updateSoldAndWasted);



export default routes;
