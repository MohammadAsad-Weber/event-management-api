import type { RequestHandler } from "express";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const getEvents: RequestHandler<
  {},
  {},
  {},
  { page?: string; limit?: string }
> = async (req, res, next) => {
  try {
    // Parse pagination parameters from query string or use default values
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // Count total number of upcoming events (with a date in the future)
    const totalEvents = await prisma.events.count();

    // Retrieve all events sorted alphabetically by title
    const events = await prisma.events.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { title: "asc" },
    });
    // Construct metadata for pagination
    const meta = {
      totalEvents,
      currentPage: page,
      hasNextPage: page < Math.ceil(totalEvents / limit),
      totalPages: Math.ceil(totalEvents / limit),
    };
    // Send the successful response with event data and pagination metadata
    createResponse(res).send<{ meta: typeof meta; events: typeof events }>({
      status: "OK",
      status_code: 200,
      meta: meta,
      events: events,
    });
  } catch (error) {
    next(error);
  }
};

export default getEvents;
