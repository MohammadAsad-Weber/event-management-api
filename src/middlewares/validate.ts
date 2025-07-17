import type { RequestHandler } from "express";
import type { ZodType, ZodObject } from "zod/v4";
import { createResponse } from "@/utilities/index.js";

// Middleware
const validate =
  (schema: ZodObject<{ [key: string]: ZodType }>): RequestHandler =>
  (req, res, next) => {
    try {
      // Safely parse the incoming request body using the schema
      const { success, data, error } = schema.safeParse(req.body);

      // If validation fails, collect and return formatted error messages
      if (!success) {
        const errors = error.issues.reduce<Record<string, string>>(
          (acc, { path, message }) => {
            acc[path.join(".")] = message;
            return acc;
          },
          {}
        );
        createResponse(res).send<{ errors: typeof errors }>({
          status: "Bad Request",
          status_code: 400,
          errors: errors,
        });
        return;
      }
      // If validation passes, assign parsed data back to req.body
      req.body = data;
      next();
    } catch (error) {
      next(error);
    }
  };

export default validate;
