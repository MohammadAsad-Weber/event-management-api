import type { RequestHandler } from "express";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const getUsers: RequestHandler<
  {},
  {},
  {},
  { page?: string; limit?: string }
> = async (req, res, next) => {
  try {
    // Parse pagination parameters from query string or apply defaults
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    // Count the total number of users in the database
    const totalUsers = await prisma.users.count();

    // Fetch the users with pagination and alphabetical ordering by name
    const users = await prisma.users.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { name: "asc" },
    });
    // Prepare pagination metadata
    const meta = {
      totalUsers,
      currentPage: page,
      hasNextPage: page < Math.ceil(totalUsers / limit),
      totalPages: Math.ceil(totalUsers / limit),
    };
    // Send the retrieved users along with pagination metadata
    createResponse(res).send<{ meta: typeof meta; users: typeof users }>({
      status: "OK",
      status_code: 200,
      meta: meta,
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

export default getUsers;
