import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpConstants";
import * as eventService from "../services/eventService";
import type { Event } from "../models/eventModels";

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events: Event[] = await eventService.getAllEvents();
    res.status(HTTP_STATUS.OK).json({
      message: "Events retrieved",
      count: events.length,
      data: events,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventByID = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const event = await eventService.findEventById(id);
    if (!event) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Event not found",
    });
    return;
    }
    res.status(HTTP_STATUS.OK).json({
        message: "Event retrieved",
        data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventPopularity = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const event = await eventService.getEventPopularity(id);
    if (!event) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        message: "Event not found",
    });
    return;
    }
    res.status(HTTP_STATUS.OK).json({
        message: "Event popularity calculated",
        data: event,
    });
  } catch (error) {
    next(error);
  }
};
