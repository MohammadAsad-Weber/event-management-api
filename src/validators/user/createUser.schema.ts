import { z } from "zod/v4";

export const CreateUserSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .trim()
    .nonempty({ error: "Name cannot be empty" })
    .min(3, { error: "Name must be at least 3 characters long" })
    .max(50, { error: "Name must not exceed 50 characters" }),
  email: z
    .email({ error: "Invalid email address format" })
    .trim()
    .lowercase()
    .nonempty({ error: "Email cannot be empty" })
    .max(100, { error: "Email must not exceed 100 characters" }),
});
export type CreateUserType = z.infer<typeof CreateUserSchema>;
