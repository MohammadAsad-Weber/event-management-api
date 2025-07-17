import "dotenv/config.js";
import helmet from "helmet";
import express from "express";

// Helper & Middleware functions
import { createResponse } from "./utilities/index.js";
import { errorHandler } from "./middlewares/index.js";

// Route Handlers
import { eventHandler, registerHandler, userHandler } from "./routes/index.js";

// Constant variables
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(helmet());

// API Routes
app.use("/user", userHandler);
app.use("/event", eventHandler);
app.use("/register", registerHandler);

// Fallback Routes
app.use((_, res) => {
  createResponse(res).send({
    status: "Not Found",
    status_code: 404,
    message: "The requested URL was not found on this server",
  });
});
// Error-Handler Middleware
app.use(errorHandler);

// Listening to the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
