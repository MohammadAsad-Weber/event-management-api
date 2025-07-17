import type { RequestHandler } from "express";
import type { UpdateEventType } from "@/validators/index.js";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const updateEvent: RequestHandler<{ id?: string }> = async (req, res, next) => {
  try {
    // Extract updated fields from the request body
    const { title, location, date, capacity } = req.body as UpdateEventType;

    // Ensure the event ID is provided in the request parameters
    if (!req.params.id) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "Event ID is required but was not provided in the request",
      });
      return;
    }
    // Check if the event with the provided ID exists in the database
    const event = await prisma.events.findUnique({
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
    // Check if another event with the same title already exists (excluding current event)
    const existingEvent = await prisma.events.findFirst({
      where: { id: { not: req.params.id }, title: title },
    });
    if (existingEvent) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "Another event with this title already exists",
      });
      return;
    }
    // Validate that the updated data is not identical to existing event data
    if (
      title === event.title &&
      location === event.location &&
      new Date(date) === new Date(event.date) &&
      capacity === event.capacity
    ) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message:
          "The provided details are identical to the current event information",
      });
      return;
    }
    // Perform the update operation in the database
    await prisma.events.update({
      data: { title, location, date, capacity },
      where: { id: req.params.id },
    });
    // Send a success response indicating update was accepted
    createResponse(res).send({
      status: "Accepted",
      status_code: 202,
      message: "Event details successfully updated",
    });
  } catch (error) {
    next(error);
  }
};

export default updateEvent;
