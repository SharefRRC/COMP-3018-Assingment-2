import { Request, Response, NextFunction } from "express";
import { PRIORITIES, STATUSES } from "../services/tickets.services";

// Validate CREATE ticket
export function validateCreateTicket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, description, priority } = req.body;

  if (!title)
    return res.status(400).json({ message: "Missing required field: title" });

  if (!description)
    return res
      .status(400)
      .json({ message: "Missing required field: description" });

  if (!priority || !PRIORITIES.includes(priority)) {
    return res.status(400).json({
      message: "Invalid priority. Must be one of: critical, high, medium, low",
    });
  }

  next();
}

// Validate UPDATE ticket
export function validateUpdateTicket(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { priority, status } = req.body;

  if (priority !== undefined && !PRIORITIES.includes(priority)) {
    return res.status(400).json({
      message: "Invalid priority. Must be one of: critical, high, medium, low",
    });
  }

  if (status !== undefined && !STATUSES.includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Must be one of: open, in-progress, resolved",
    });
  }

  next();
}

export { STATUSES };