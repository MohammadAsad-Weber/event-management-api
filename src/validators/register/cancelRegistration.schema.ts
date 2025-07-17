import { z } from "zod/v4";
import { RegisterSchema } from "./register.schema.js";

export const CancelRegistrationSchema = RegisterSchema;
export type CancelRegistrationType = z.infer<typeof CancelRegistrationSchema>;
