import express from "express";
import { validate } from "@/middlewares/index.js";
import { CreateUserSchema, UpdateUserSchema } from "@/validators/index.js";

// Event Controllers
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "@/controllers/index.js";

// Express Router
const router = express.Router();

// Routes
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", validate(CreateUserSchema), createUser);
router.put("/:id", validate(UpdateUserSchema), updateUser);
router.delete("/:id", deleteUser);

export default router;
