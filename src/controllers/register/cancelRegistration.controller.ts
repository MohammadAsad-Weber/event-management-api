import type { RequestHandler } from "express";
import { prisma, createResponse } from "@/utilities/index.js";
import type { CancelRegistrationType } from "@/validators/index.js";

// Controller
const cancelRegistration: RequestHandler = async (req, res, next) => {
  try {
    // Extract userId and eventId from the request body
    const { userId, eventId } = req.body as CancelRegistrationType;

    // Verify if the user exists
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "User with the specified ID was not found",
      });
      return;
    }
    // Verify if the event exists
    const event = await prisma.events.findUnique({ where: { id: eventId } });
    if (!event) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "Event with the specified ID was not found",
      });
      return;
    }
    // Check if the user is registered for the event
    const isRegistered = await prisma.registrations.findFirst({
      where: { userId, eventId },
    });
    if (!isRegistered) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "User is not registered for this event",
      });
      return;
    }
    // Cancel the user's registration for the event
    await prisma.registrations.delete({
      where: {
        userId_eventId: {
          userId,
          eventId,
        },
      },
    });
    // Send a success response
    createResponse(res).send({
      status: "Accepted",
      status_code: 202,
      message: "User registration for the event has been cancelled",
    });
  } catch (error) {
    next(error);
  }
};

export default cancelRegistration;
