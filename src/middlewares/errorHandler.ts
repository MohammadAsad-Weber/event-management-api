import { createResponse } from "@/utilities/index.js";
import type { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const error = err instanceof Error ? err : new Error(String(err));
  const isProduction = process.env.ENVIRONMENT === "PRODUCTION";

  console.error(`\n[Uncaught Error]: ${error.stack ?? error.message}\n`);

  createResponse(res).send({
    status: "Internal Server Error",
    status_code: 500,
    message: isProduction
      ? "Something went wrong on our server"
      : error.message,
  });
};

export default errorHandler;
