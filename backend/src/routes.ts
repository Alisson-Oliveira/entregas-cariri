import { Router } from 'express';

import UsersControllers from './controllers/UsersControllers';
import PurchasesControllers from './controllers/PurchasesControllers';

const routes = Router();

routes.get('/users/:id', UsersControllers.index);
routes.post('/register', UsersControllers.create);

routes.get('/purchases/:id', PurchasesControllers.index);
routes.get('/purchases/currentycompleted/:id', PurchasesControllers.show);
routes.post('/purchases/purchase', PurchasesControllers.create);

export default routes;
