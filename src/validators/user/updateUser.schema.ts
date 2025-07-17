import { z } from "zod/v4";
import { CreateUserSchema } from "./createUser.schema.js";

export const UpdateUserSchema = CreateUserSchema;
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
