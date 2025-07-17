import type { RequestHandler } from "express";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const upcomingEvents: RequestHandler<
  {},
  {},
  {},
  { page?: string; limit?: string }
> = async (req, res, next) => {
  try {
    // Parse pagination parameters from query string, defaulting to page 1 and limit 10
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // Count total number of upcoming events (events with a future date)
    const totalEvents = await prisma.events.count({
      where: { date: { gt: new Date() } },
    });
    // Fetch upcoming events with pagination and sorting applied
    const events = await prisma.events.findMany({
      where: {
        date: { gt: new Date() },
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: [{ date: "asc" }, { location: "asc" }],
    });
    // Construct pagination metadata
    const meta = {
      totalEvents,
      currentPage: page,
      hasNextPage: page < Math.ceil(totalEvents / limit),
      totalPages: Math.ceil(totalEvents / limit),
    };
    // Send success response including event data and metadata
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

export default upcomingEvents;
