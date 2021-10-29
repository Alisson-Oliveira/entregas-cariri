import { Router } from 'express';
//test
import UsersControllers from './controllers/UsersControllers';
import PurchasesControllers from './controllers/PurchasesControllers';
import ValidateControllers from './controllers/ValidateControllers';

const routes = Router();

routes.get('/users/:id', UsersControllers.index);
routes.post('/register', UsersControllers.create);
routes.post('/authenticate', UsersControllers.show);

routes.post('/check/email', ValidateControllers.execute);

routes.get('/purchases/:id', PurchasesControllers.index);
routes.get('/purchases/details/:id', PurchasesControllers.details);
routes.get('/purchases/purchase/:id', PurchasesControllers.show);
routes.post('/purchases/purchase', PurchasesControllers.create);
routes.put('/purchase/completed/:id', PurchasesControllers.update);
routes.put('/purchase/canceled/:id', PurchasesControllers.cancel);

export default routes;
