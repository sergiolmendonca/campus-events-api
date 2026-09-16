import { AppContext } from '../app';
import { Event } from '../database/types';
import { NextFunction, Request, Response } from 'express';

export interface EventController {
  getAllEvents(req: Request, res: Response<Event[]>, next: NextFunction): Promise<void>;
  createEvent(req: Request, res: Response<Event>, next: NextFunction): Promise<void>;
}

export const eventController = ({ queries }: AppContext): EventController => {
  return {
    getAllEvents: async (req, res) => {
      const events = await queries.getAllEvents();
      res.send(events);
    },
    createEvent: async (req, res) => {
      const event = Event.parse(req.body);
      const newEvent = await queries.createEvent(event);
      res.send(newEvent);
    },
  };
};
