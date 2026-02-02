import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

import { ticketsRouter } from "./routes/tickets.routes";
app.use("/api/v1/tickets", ticketsRouter);

app.use(errorHandler);
