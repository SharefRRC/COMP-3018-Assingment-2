import { Request, Response } from "express";
import { getTicketById } from "../services/tickets.services";
import { calculateTicketAgeDays, calculateUrgencyScore, urgencyLevelFromScore } from "../services/urgency.service";

export function getUrgency(req: Request, res: Response) {
  const id = Number(req.params.id);
  const ticket = getTicketById(id);

  if (!ticket) return res.status(404).json({ message: "Ticket not found" });

  if (ticket.status === "resolved") {
    return res.status(200).json({
      message: "Ticket urgency calculated",
      data: { ...ticket, ticketAge: 0, urgencyScore: 0, urgencyLevel: "Minimal. Ticket resolved." }
    });
  }

  const ticketAge = calculateTicketAgeDays(ticket.createdAt);
  const urgencyScore = calculateUrgencyScore(ticket, ticketAge);
  const urgencyLevel = urgencyLevelFromScore(urgencyScore);

  return res.status(200).json({
    message: "Ticket urgency calculated",
    data: { ...ticket, ticketAge, urgencyScore, urgencyLevel }
  });
}
