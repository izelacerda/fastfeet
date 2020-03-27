import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileControlller from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import OrderController from './app/controllers/OrderController';
import OrderCollectController from './app/controllers/OrderCollectController';
import OrderCancelController from './app/controllers/OrderCancelController';
import OrderFinishController from './app/controllers/OrderFinishController';
import DeliveryManOrdersController from './app/controllers/DeliveryManOrdersController';
import OrderProblemController from './app/controllers/OrderProblemController';
import DashBoardController from './app/controllers/DashBoardController';
import authMiddleware from './app/middleware/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.get('/', async (req, res) => res.send('ok'));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/deliveryman/:id', DeliveryManController.index);
routes.get('/deliveryman/:id/orders', DeliveryManOrdersController.index);
routes.put('/deliveryman/:id', DeliveryManController.update);

routes.put('/order/:id/altercollect', OrderCollectController.altercollect);
routes.put('/order/:id/collect', OrderCollectController.update);

routes.post(
  '/order/:id/alterfinish',
  upload.single('file'),

  OrderFinishController.alterfinish
);

// Crie uma rota para a distribuidora listar todas as entregas com algum problema;
routes.get('/order/problems', OrderProblemController.index);
// Crie uma rota para listar todos os problemas de uma encomenda baseado no ID da encomenda.
routes.get('/order/:id/problems', OrderProblemController.show);
// // Crie uma rota para o entregador cadastrar problemas na entrega apenas informando seu ID de cadastro (ID da encomenda no banco de dados);
routes.post('/order/:id/problems', OrderProblemController.store);
// // Crie uma rota para a distribuidora cancelar uma entrega baseado no ID do problema. Esse cancelamento pode acontecer devido a gravidade do problema da entrega, por exemplo, em caso de perda da encomenda.
routes.delete('/orderproblem/:id', OrderProblemController.delete);

routes.post('/files', upload.single('file'), FileControlller.store);

routes.use(authMiddleware);
routes.get('/dashboard', DashBoardController.index);
routes.put('/users/:id', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.index);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/deliveryman', DeliveryManController.index);
routes.post('/deliveryman', DeliveryManController.store);
routes.delete('/deliveryman/:id', DeliveryManController.delete);

routes.get('/order', OrderController.index);
routes.post('/order', OrderController.store);
routes.put('/order/:id', OrderController.update);
routes.delete('/order/:id', OrderController.delete);

routes.put('/order/:id/cancel', OrderCancelController.update);
routes.put('/order/:id/finish', OrderFinishController.update);

export default routes;
