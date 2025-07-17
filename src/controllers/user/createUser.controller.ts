import type { RequestHandler } from "express";
import type { CreateUserType } from "@/validators/index.js";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const createUser: RequestHandler = async (req, res, next) => {
  try {
    // Extract name and email from the request body
    const { name, email } = req.body as CreateUserType;

    // Check if a user with the same email already exists
    const user = await prisma.users.findUnique({ where: { email } });
    if (user) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "An account with this email already exists",
      });
      return;
    }
    // Create a new user in the database
    const { id } = await prisma.users.create({ data: { name, email } });

    // Send a success response including the newly created user ID
    createResponse(res).send({
      status: "Created",
      status_code: 201,
      message: `User account successfully created with ID: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

export default createUser;
