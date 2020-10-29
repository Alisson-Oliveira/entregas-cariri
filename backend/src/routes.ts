import { Router } from 'express';

import UsersControllers from './controllers/UsersControllers';
// import AuthControllers from './controllers/AuthControllers';
import PurchasesControllers from './controllers/PurchasesControllers';

const routes = Router();

routes.get('/users/:id', UsersControllers.index);
routes.post('/register', UsersControllers.create);

// routes.post('/authenticate', UsersControllers.show);
// routes.get('/user', AuthControllers.show);

routes.get('/purchases/:id', PurchasesControllers.index)
routes.post('/purchases/purchase', PurchasesControllers.create);

export default routes;
