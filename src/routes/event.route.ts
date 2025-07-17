import express from "express";
import { validate } from "@/middlewares/index.js";
import { CreateEventSchema, UpdateEventSchema } from "@/validators/index.js";

// Event Controllers
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  upcomingEvents,
  updateEvent,
} from "@/controllers/index.js";

// Express Router
const router = express.Router();

// Routes
router.get("/upcoming", upcomingEvents);
router.get("/:id", getEvent);
router.get("/", getEvents);
router.post("/", validate(CreateEventSchema), createEvent);
router.put("/:id", validate(UpdateEventSchema), updateEvent);
router.delete("/:id", deleteEvent);

export default router;
