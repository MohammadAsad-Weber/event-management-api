import z from "zod/v4";
import { CreateEventSchema } from "./createEvent.schema.js";

export const UpdateEventSchema = CreateEventSchema;
export type UpdateEventType = z.infer<typeof UpdateEventSchema>;
