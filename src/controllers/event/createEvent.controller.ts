import type { RequestHandler } from "express";
import type { CreateEventType } from "@/validators/index.js";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const createEvent: RequestHandler = async (req, res, next) => {
  try {
    // Extracting relevant fields from the request body and validating type
    const { title, location, date, capacity } = req.body as CreateEventType;

    // Check if an event with the same title already exists in the database
    const event = await prisma.events.findUnique({ where: { title } });
    if (event) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "An event with the specified title already exists",
      });
      return;
    }
    // Create a new event in the database using provided data
    const { id } = await prisma.events.create({
      data: {
        title,
        location,
        date,
        capacity,
      },
    });
    // Send a 201 Created response with the newly created event ID
    createResponse(res).send({
      status: "Created",
      status_code: 201,
      message: `The event has been successfully created. Event ID: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

export default createEvent;
