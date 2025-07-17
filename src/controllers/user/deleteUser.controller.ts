import type { RequestHandler } from "express";
import { prisma, createResponse } from "@/utilities/index.js";

// Controller
const deleteUser: RequestHandler<{ id?: string }> = async (req, res, next) => {
  try {
    // Ensure the user ID is provided in the route parameters
    if (!req.params.id) {
      createResponse(res).send({
        status: "Bad Request",
        status_code: 400,
        message: "User ID is required but was not provided in the request",
      });
      return;
    }
    // Verify if the user with the provided ID exists
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
    // Proceed to delete the user from the database
    await prisma.users.delete({ where: { id: req.params.id } });

    // Send a success response confirming the deletion
    createResponse(res).send({
      status: "Accepted",
      status_code: 202,
      message: "User account successfully deleted",
    });
  } catch (error) {
    next(error);
  }
};

export default deleteUser;
