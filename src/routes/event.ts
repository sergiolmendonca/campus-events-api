import { Router } from 'express';
import { eventController } from '../controllers/event';
import { AppContext } from '../app';

export const eventRoutes = (ctx: AppContext): Router => {
  const router = Router();
  const controller = eventController(ctx);

  router.get('/', controller.getAllEvents);
  router.post('/', controller.createEvent);

  return router;
};
