import { z } from "zod/v4";

export const CreateEventSchema = z.object({
  title: z
    .string({ error: "Event title is required" })
    .trim()
    .nonempty({ error: "Event title cannot be empty" })
    .min(10, { error: "Title must be at least 10 characters long" })
    .max(150, { error: "Title must not exceed 150 characters" }),
  location: z
    .string({ error: "Location is required" })
    .trim()
    .nonempty({ error: "Location cannot be empty" })
    .min(3, { error: "Location must be at least 3 characters long" })
    .max(125, { error: "Location must not exceed 125 characters" }),
  capacity: z
    .number({ error: "Capacity is required" })
    .positive({ error: "Capacity must be a positive number" })
    .max(1000, { error: "Capacity cannot exceed 1000 attendees" }),
  date: z.iso
    .datetime({ error: "Invalid date format, Use ISO 8601 format" })
    .refine((val) => new Date(val) > new Date(7 * 24 * 60 * 60 * 1000), {
      error: "Event date must be at least 7 days in the future",
    }),
});
export type CreateEventType = z.infer<typeof CreateEventSchema>;
