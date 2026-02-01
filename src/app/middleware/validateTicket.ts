import { Request, Response, NextFunction } from "express";
import { PRIORITIES, STATUSES } from "../services/tickets.services";

export function validateCreateTicket(req: Request, res: Response, next: NextFunction) {
  const { title, description, priority } = req.body;

  if (!title) return res.status(400).json({ message: "Missing required field: title" });
  if (!description) return res.status(400).json({ message: "Missing required field: description" });

  if (!priority || !PRIORITIES.includes(priority)) {
    return res.status(400).json({
      message: "Invalid priority. Must be one of: critical, high, medium, low"
    });
  }

  next();
}

export { STATUSES }; // just kept it here for now in case need to export later
