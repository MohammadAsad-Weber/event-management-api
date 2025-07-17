import { z } from "zod/v4";

export const RegisterSchema = z.object({
  userId: z
    .string({ error: "User ID is required" })
    .trim()
    .nonempty({ error: "User ID cannot be empty" }),
  eventId: z
    .string({ error: "Event ID is required" })
    .trim()
    .nonempty({ error: "Event ID cannot be empty" }),
});
export type RegisterType = z.infer<typeof RegisterSchema>;
