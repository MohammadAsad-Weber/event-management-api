import type { RequestHandler } from "express";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const getEvent: RequestHandler<{ id?: string }> = async (req, res, next) => {
  try {
    // Ensure the event ID is present in the request parameters
    if (!req.params.id) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "Event ID is required but was not provided in the request",
      });
      return;
    }
    // If event does not exist, return a 400 response
    const event = await prisma.events.findUnique({
      select: {
        title: true,
        date: true,
        location: true,
        capacity: true,
        registrations: true,
      },
      where: { id: req.params.id },
    });
    if (!event) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "Event with the specified ID was not found",
      });
      return;
    }
    // Respond with the retrieved event data
    createResponse(res).send<{ event: typeof event }>({
      status: "OK",
      status_code: 200,
      event: event,
    });
  } catch (error) {
    next(error);
  }
};

export default getEvent;
