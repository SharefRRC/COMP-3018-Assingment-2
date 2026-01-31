import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});


app.use(errorHandler);
