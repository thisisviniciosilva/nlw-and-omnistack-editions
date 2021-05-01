import { Router } from 'express';

import ItemsController from './controllers/ItemsController';
import PointsController from './controllers/PointsController';

const routes = Router();

routes.get('/items', ItemsController.index);
routes.post('/items/registerall', ItemsController.store);

routes.get('/points', PointsController.index);
routes.get('/points/:_id', PointsController.show);
routes.post('/points', PointsController.store);

export default routes;
