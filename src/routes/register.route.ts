import express from "express";
import { validate } from "@/middlewares/index.js";
import { cancelRegistration, register } from "@/controllers/index.js";

// Validation Schemas
import {
  CancelRegistrationSchema,
  RegisterSchema,
} from "@/validators/index.js";

// Express Router
const router = express.Router();

// Routes
router.post("/", validate(RegisterSchema), register);
router.delete("/", validate(CancelRegistrationSchema), cancelRegistration);

export default router;
