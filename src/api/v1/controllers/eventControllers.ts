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

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Basic validation - check for required fields
    if (!req.body.name) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required field: name",
      });
      } else if (!req.body.date) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required field: date",
    });
    } else if (!req.body.capacity) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing required field: capacity",
    });
    } else {
      // Extract only the fields we need
      const { name, date, capacity } = req.body;
      const eventData = { name, date, capacity };

      const newEvent: Event = await eventService.createEvent(eventData);
      res.status(HTTP_STATUS.CREATED).json({
        message: "Event created successfully",
        data: newEvent,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Missing event ID",
        });
        return;
        }

    const existingEvent = await eventService.findEventById(id);

    if (!existingEvent) {
        res.status(HTTP_STATUS.NOT_FOUND).json({
            message: "Event not found",
        });
        return;
    }

    // Extract update fields
    const { name, date, capacity, registrationCount } = req.body;

    // Create update data object with only the fields that can be updated
    const updateData = { 
        name, 
        date, 
        capacity, 
        registrationCount,
    };

    const updatedEvent: Event = await eventService.updateEvent(id, updateData);
    res.status(HTTP_STATUS.OK).json({
      message: "Event updated successfully",
      data: updatedEvent,
    });
  } catch (error) {
    next(error);
  }
};
