import type { RequestHandler } from "express";
import type { UpdateUserType } from "@/validators/index.js";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const updateUser: RequestHandler<{ id?: string }> = async (req, res, next) => {
  try {
    // Extract name and email from request body
    const { name, email } = req.body as UpdateUserType;

    // Validate the presence of user ID in request parameters
    if (!req.params.id) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "User ID is required but was not provided in the request",
      });
      return;
    }
    // Check if the user exists in the database
    const user = await prisma.users.findUnique({
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
    // Check if another user already exists with the provided email
    const existingUser = await prisma.users.findFirst({
      where: { id: { not: req.params.id }, email: email },
    });
    if (existingUser) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "Another user with this email address already exists",
      });
      return;
    }
    // Verify that the new details are different from current data
    if (name === user.name && email === user.email) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message:
          "The provided details are identical to the current user information",
      });
      return;
    }
    // Update the user record in the database
    await prisma.users.update({
      data: { name, email },
      where: { id: req.params.id },
    });
    // Send a success response indicating update was accepted
    createResponse(res).send({
      status: "Accepted",
      status_code: 202,
      message: "User details successfully updated",
    });
  } catch (error) {
    next(error);
  }
};

export default updateUser;
