import type { RequestHandler } from "express";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const deleteEvent: RequestHandler<{ id?: string }> = async (req, res, next) => {
  try {
    // Ensure the request includes an event ID in the URL parameters
    if (!req.params.id) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "Event ID is required but was not provided in the request",
      });
      return;
    }
    // Verify if the event with the specified ID exists in the database
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
    // Delete the event from the database
    await prisma.events.delete({ where: { id: req.params.id } });

    // Respond with 202 Accepted indicating successful deletion
    createResponse(res).send({
      status: "Accepted",
      status_code: 202,
      message: "Event successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteEvent;
