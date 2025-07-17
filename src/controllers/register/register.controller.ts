import type { RequestHandler } from "express";
import type { RegisterType } from "@/validators/index.js";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const register: RequestHandler = async (req, res, next) => {
  try {
    // Extract userId and eventId from the request body
    const { userId, eventId } = req.body as RegisterType;

    // Verify the existence of the user
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "User with the specified ID was not found",
      });
      return;
    }
    // Verify the existence of the event
    const event = await prisma.events.findUnique({ where: { id: eventId } });
    if (!event) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "Event with the specified ID was not found",
      });
      return;
    }
    // Check if the user is already registered
    const hasRegistered = await prisma.registrations.findFirst({
      where: { userId, eventId },
    });
    if (hasRegistered) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "User is already registered for this event",
      });
      return;
    }
    // Check if the event has reached its capacity
    const totalSeats = await prisma.registrations.count({ where: { eventId } });
    if (totalSeats === event.capacity) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "Registration failed: event is fully booked",
      });
      return;
    }
    // Register the user for the event
    await prisma.registrations.create({
      data: { userId, eventId },
    });
    // Respond with a success message
    createResponse(res).send({
      status: "Created",
      status_code: 201,
      message: "User successfully registered for the event",
    });
  } catch (error) {
    next(error);
  }
};

export default register;
