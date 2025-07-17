import type { RequestHandler } from "express";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const getUser: RequestHandler<{ id?: string }> = async (req, res, next) => {
  try {
    // Ensure the user ID is present in the request parameters
    if (!req.params.id) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "User ID is required but was not provided in the request",
      });
      return;
    }
    // If user does not exist, return a 400 response
    const user = await prisma.users.findUnique({
      select: {
        name: true,
        email: true,
        registrations: true,
      },
      where: { id: req.params.id },
    });
    if (!user) {
      createResponse(res).send({
        status: "Not Found",
        status_code: 404,
        message: "User with the specified ID was not found",
      });
      return;
    }
    // Send the retrieved user data in the response
    createResponse(res).send<{ user: typeof user }>({
      status: "OK",
      status_code: 200,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export default getUser;
